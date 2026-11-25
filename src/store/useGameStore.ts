import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  AnswerRecord,
  GameMode,
  GameStage,
  KitchenHotspot,
  LevelSummary,
  MistakeRecord,
  SubtopicCode,
} from '../types/game';
import {
  applyScoreDelta,
  calculateAnswerPoints,
  calculateTimeBonus,
  LEVEL_DURATION_SECONDS,
} from '../utils/scoring';

interface ProcessAnswerPayload {
  itemId: string;
  level: 1 | 2 | 3;
  subtopic: SubtopicCode;
  isCorrect: boolean;
  itemTitle: string;
  userChoice: string;
  correctChoice: string;
  explanation: string;
  kssmReference: string;
}

interface GameStoreState {
  currentStage: GameStage;
  gameMode: GameMode;
  playerName: string;
  playerClass: string;
  score: number;
  streak: number;
  bestStreak: number;
  timeLeft: number;
  isTimerActive: boolean;
  isMuted: boolean;
  isRulebookOpen: boolean;
  answers: Record<string, AnswerRecord>;
  mistakes: MistakeRecord[];
  levelSummaries: Partial<Record<1 | 2 | 3, LevelSummary>>;
  activeModalHotspot: KitchenHotspot | null;
  pendingLevelRecap: LevelSummary | null;

  // Actions
  startGame: (name: string, playerClass: string, mode?: GameMode) => void;
  processAnswer: (payload: ProcessAnswerPayload) => number;
  completeCurrentLevel: (level: 1 | 2 | 3, totalItemsInLevel: number) => void;
  proceedFromLevelRecap: () => void;
  resetGame: () => void;
  tickTimer: () => void;
  setTimeLeft: (seconds: number) => void;
  setTimerActive: (active: boolean) => void;
  toggleMute: () => void;
  setRulebookOpen: (open: boolean) => void;
  setActiveModalHotspot: (hotspot: KitchenHotspot | null) => void;
}

const initialGameState = {
  currentStage: 'menu' as GameStage,
  gameMode: 'timed' as GameMode,
  playerName: '',
  playerClass: '5 SRT',
  score: 0,
  streak: 0,
  bestStreak: 0,
  timeLeft: LEVEL_DURATION_SECONDS,
  isTimerActive: false,
  isMuted: false,
  isRulebookOpen: false,
  answers: {} as Record<string, AnswerRecord>,
  mistakes: [] as MistakeRecord[],
  levelSummaries: {} as Partial<Record<1 | 2 | 3, LevelSummary>>,
  activeModalHotspot: null as KitchenHotspot | null,
  pendingLevelRecap: null as LevelSummary | null,
};

export const useGameStore = create<GameStoreState>()(
  persist(
    (set, get) => ({
      ...initialGameState,

      startGame: (name, playerClass, mode = 'timed') => {
        set({
          ...initialGameState,
          isMuted: get().isMuted,
          playerName: name.trim(),
          playerClass: playerClass.trim() || '5 SRT',
          gameMode: mode,
          currentStage: 'level1',
          timeLeft: LEVEL_DURATION_SECONDS,
          isTimerActive: mode === 'timed',
        });
      },

      processAnswer: (payload) => {
        const state = get();
        // Prevent double-scoring an already resolved item
        if (state.answers[payload.itemId]) {
          return 0;
        }

        const pointsAwarded = calculateAnswerPoints(payload.isCorrect, state.streak);
        const nextScore = applyScoreDelta(state.score, pointsAwarded);
        const nextStreak = payload.isCorrect ? state.streak + 1 : 0;
        const nextBestStreak = Math.max(state.bestStreak, nextStreak);

        const newAnswer: AnswerRecord = {
          itemId: payload.itemId,
          level: payload.level,
          subtopic: payload.subtopic,
          isCorrect: payload.isCorrect,
          userChoice: payload.userChoice,
          correctChoice: payload.correctChoice,
          pointsAwarded,
        };

        const nextMistakes = payload.isCorrect
          ? state.mistakes
          : [
              ...state.mistakes,
              {
                id: payload.itemId,
                level: payload.level,
                itemTitle: payload.itemTitle,
                userChoice: payload.userChoice,
                correctChoice: payload.correctChoice,
                explanation: payload.explanation,
                kssmReference: payload.kssmReference,
                subtopic: payload.subtopic,
              },
            ];

        set({
          score: nextScore,
          streak: nextStreak,
          bestStreak: nextBestStreak,
          answers: {
            ...state.answers,
            [payload.itemId]: newAnswer,
          },
          mistakes: nextMistakes,
        });

        return pointsAwarded;
      },

      completeCurrentLevel: (level, totalItemsInLevel) => {
        const state = get();
        const levelAnswers = Object.values(state.answers).filter(
          (ans) => ans.level === level
        );
        const correctCount = levelAnswers.filter((ans) => ans.isCorrect).length;
        const timeBonus = calculateTimeBonus(
          state.timeLeft,
          state.gameMode === 'practice'
        );

        const summary: LevelSummary = {
          level,
          correctCount,
          totalCount: totalItemsInLevel,
          timeBonus,
        };

        set({
          score: state.score + timeBonus,
          isTimerActive: false,
          activeModalHotspot: null,
          pendingLevelRecap: summary,
          levelSummaries: {
            ...state.levelSummaries,
            [level]: summary,
          },
        });
      },

      proceedFromLevelRecap: () => {
        const state = get();
        const stageMap: Record<GameStage, GameStage> = {
          menu: 'level1',
          level1: 'level2',
          level2: 'level3',
          level3: 'summary',
          summary: 'menu',
        };
        const nextStage = stageMap[state.currentStage];
        const isPlayableStage =
          nextStage === 'level1' || nextStage === 'level2' || nextStage === 'level3';

        set({
          currentStage: nextStage,
          pendingLevelRecap: null,
          activeModalHotspot: null,
          timeLeft: LEVEL_DURATION_SECONDS,
          isTimerActive: isPlayableStage && state.gameMode === 'timed',
        });
      },

      resetGame: () => {
        const prevMuted = get().isMuted;
        const prevName = get().playerName;
        const prevClass = get().playerClass;
        set({
          ...initialGameState,
          isMuted: prevMuted,
          playerName: prevName,
          playerClass: prevClass,
        });
      },

      tickTimer: () => {
        const state = get();
        if (
          !state.isTimerActive ||
          state.gameMode === 'practice' ||
          state.isRulebookOpen ||
          state.activeModalHotspot !== null ||
          state.pendingLevelRecap !== null
        ) {
          return;
        }
        if (state.timeLeft <= 1) {
          set({ timeLeft: 0, isTimerActive: false });
        } else {
          set({ timeLeft: state.timeLeft - 1 });
        }
      },

      setTimeLeft: (seconds) => set({ timeLeft: Math.max(0, seconds) }),

      setTimerActive: (active) => set({ isTimerActive: active }),

      toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),

      setRulebookOpen: (open) => set({ isRulebookOpen: open }),

      setActiveModalHotspot: (hotspot) => set({ activeModalHotspot: hotspot }),
    }),
    {
      name: 'inspektor-dapur-kkm-storage-v1',
      partialize: (state) => ({
        currentStage: state.currentStage,
        gameMode: state.gameMode,
        playerName: state.playerName,
        playerClass: state.playerClass,
        score: state.score,
        streak: state.streak,
        bestStreak: state.bestStreak,
        timeLeft: state.timeLeft,
        isMuted: state.isMuted,
        answers: state.answers,
        mistakes: state.mistakes,
        levelSummaries: state.levelSummaries,
      }),
    }
  )
);
