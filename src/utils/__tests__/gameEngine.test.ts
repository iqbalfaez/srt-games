import { describe, expect, it } from 'vitest';
import {
  getSubtopicTotals,
  level1Staff,
  level2KitchenHotspots,
  level3Compartments,
  level3StorageItems,
  TOTAL_GAME_ITEMS,
} from '../../data/syllabusContent';
import type { AnswerRecord } from '../../types/game';
import {
  applyScoreDelta,
  calculateAnswerPoints,
  calculateGrade,
  calculateSubtopicMastery,
  calculateTimeBonus,
} from '../scoring';

describe('Scoring & Grading Engine', () => {
  it('awards +100 + streak*10 for correct answers and -40 for incorrect answers', () => {
    expect(calculateAnswerPoints(true, 0)).toBe(100);
    expect(calculateAnswerPoints(true, 3)).toBe(130);
    expect(calculateAnswerPoints(false, 5)).toBe(-40);
  });

  it('never allows arcade score to drop below zero', () => {
    expect(applyScoreDelta(20, -40)).toBe(0);
    expect(applyScoreDelta(0, -40)).toBe(0);
    expect(applyScoreDelta(100, 120)).toBe(220);
  });

  it('awards +2 pts per second left only in timed mode', () => {
    expect(calculateTimeBonus(50, false)).toBe(100);
    expect(calculateTimeBonus(50, true)).toBe(0);
    expect(calculateTimeBonus(0, false)).toBe(0);
  });

  it('assigns Gred A (>=85%), Gred B (60-84%), and Gred C (<60%) strictly by accuracy', () => {
    expect(calculateGrade(17, 20).grade).toBe('A'); // 85%
    expect(calculateGrade(20, 20).grade).toBe('A'); // 100%
    expect(calculateGrade(16, 20).grade).toBe('B'); // 80%
    expect(calculateGrade(12, 20).grade).toBe('B'); // 60%
    expect(calculateGrade(11, 20).grade).toBe('C'); // 55%
  });

  it('computes accurate subtopic mastery breakdown', () => {
    const totals = getSubtopicTotals();
    const mockAnswers: Record<string, AnswerRecord> = {
      'hs-1': {
        itemId: 'hs-1',
        level: 2,
        subtopic: '2.1',
        isCorrect: true,
        userChoice: 'A',
        correctChoice: 'A',
        pointsAwarded: 100,
      },
      'staff-1': {
        itemId: 'staff-1',
        level: 1,
        subtopic: '2.2',
        isCorrect: false,
        userChoice: 'B',
        correctChoice: 'A',
        pointsAwarded: -40,
      },
    };
    const mastery = calculateSubtopicMastery(mockAnswers, totals);
    expect(mastery).toHaveLength(3);
    const sub21 = mastery.find((m) => m.code === '2.1')!;
    expect(sub21.correct).toBe(1);
    expect(sub21.total).toBe(totals['2.1']);
    expect(sub21.percentage).toBe(Math.round((1 / totals['2.1']) * 100));
  });
});

describe('KSSM SRT Tingkatan 5 Bab 2 Dataset Integrity', () => {
  it('contains 20 total items across Levels 1, 2, and 3', () => {
    expect(level1Staff).toHaveLength(6);
    expect(level2KitchenHotspots).toHaveLength(8);
    expect(level3StorageItems).toHaveLength(6);
    expect(TOTAL_GAME_ITEMS).toBe(20);
  });

  it('has 3 compliant and 3 non-compliant staff in Level 1 with valid violation indexes', () => {
    const compliant = level1Staff.filter((s) => s.correctDecision === 'pass');
    const nonCompliant = level1Staff.filter((s) => s.correctDecision === 'reject');
    expect(compliant).toHaveLength(3);
    expect(nonCompliant).toHaveLength(3);

    for (const s of nonCompliant) {
      expect(s.correctViolationIndex).toBeGreaterThanOrEqual(0);
      expect(s.correctViolationIndex).toBeLessThan(s.violationOptions.length);
    }
  });

  it('has valid percentage coordinates and options on all 8 Level 2 kitchen hotspots', () => {
    for (const hs of level2KitchenHotspots) {
      expect(hs.x).toBeGreaterThan(0);
      expect(hs.x).toBeLessThan(100);
      expect(hs.y).toBeGreaterThan(0);
      expect(hs.y).toBeLessThan(100);
      expect(hs.options).toHaveLength(3);
      expect(hs.correctOptionIndex).toBeGreaterThanOrEqual(0);
      expect(hs.correctOptionIndex).toBeLessThan(3);
    }
  });

  it('maps every Level 3 storage item to a valid compartment and valid violation reason', () => {
    const compartmentIds = new Set(level3Compartments.map((c) => c.id));
    for (const item of level3StorageItems) {
      expect(compartmentIds.has(item.compartment)).toBe(true);
      if (!item.isSafe) {
        expect(item.correctViolationIndex).toBeGreaterThanOrEqual(0);
        expect(item.correctViolationIndex).toBeLessThan(item.violationOptions.length);
      }
    }
  });
});

describe('Full Game Store Playthrough (Levels 1 -> 2 -> 3 -> Summary)', () => {
  it('progresses cleanly across all 3 levels, pauses timer on rulebook, and reaches Gred A', async () => {
    const { useGameStore } = await import('../../store/useGameStore');
    const store = useGameStore.getState();
    store.resetGame();

    useGameStore.getState().startGame('Aisyah QA', '5 SRT', 'timed');
    expect(useGameStore.getState().currentStage).toBe('level1');
    expect(useGameStore.getState().timeLeft).toBe(120);

    // Timer ticks normally
    useGameStore.getState().tickTimer();
    expect(useGameStore.getState().timeLeft).toBe(119);

    // Timer pauses while Rulebook is open
    useGameStore.getState().setRulebookOpen(true);
    useGameStore.getState().tickTimer();
    expect(useGameStore.getState().timeLeft).toBe(119);
    useGameStore.getState().setRulebookOpen(false);

    // Complete Level 1 (6 staff)
    for (const staff of level1Staff) {
      useGameStore.getState().processAnswer({
        itemId: staff.id,
        level: 1,
        subtopic: staff.subtopic,
        isCorrect: true,
        itemTitle: staff.name,
        userChoice: 'OK',
        correctChoice: 'OK',
        explanation: staff.explanation,
        kssmReference: staff.kssmReference,
      });
    }
    useGameStore.getState().completeCurrentLevel(1, level1Staff.length);
    expect(useGameStore.getState().pendingLevelRecap?.level).toBe(1);
    useGameStore.getState().proceedFromLevelRecap();
    expect(useGameStore.getState().currentStage).toBe('level2');

    // Complete Level 2 (8 hotspots)
    for (const hs of level2KitchenHotspots) {
      useGameStore.getState().processAnswer({
        itemId: hs.id,
        level: 2,
        subtopic: hs.subtopic,
        isCorrect: true,
        itemTitle: hs.title,
        userChoice: hs.options[hs.correctOptionIndex],
        correctChoice: hs.options[hs.correctOptionIndex],
        explanation: hs.explanation,
        kssmReference: hs.textbookReference,
      });
    }
    useGameStore.getState().completeCurrentLevel(2, level2KitchenHotspots.length);
    useGameStore.getState().proceedFromLevelRecap();
    expect(useGameStore.getState().currentStage).toBe('level3');

    // Complete Level 3 (6 storage items)
    for (const item of level3StorageItems) {
      useGameStore.getState().processAnswer({
        itemId: item.id,
        level: 3,
        subtopic: item.subtopic,
        isCorrect: true,
        itemTitle: item.name,
        userChoice: 'OK',
        correctChoice: 'OK',
        explanation: item.defectReason,
        kssmReference: item.kssmReference,
      });
    }
    useGameStore.getState().completeCurrentLevel(3, level3StorageItems.length);
    useGameStore.getState().proceedFromLevelRecap();

    const finalState = useGameStore.getState();
    expect(finalState.currentStage).toBe('summary');
    expect(Object.keys(finalState.answers)).toHaveLength(TOTAL_GAME_ITEMS);
    expect(finalState.mistakes).toHaveLength(0);
    expect(finalState.bestStreak).toBe(TOTAL_GAME_ITEMS);

    const grade = calculateGrade(
      Object.values(finalState.answers).filter((a) => a.isCorrect).length,
      TOTAL_GAME_ITEMS
    );
    expect(grade.grade).toBe('A');
    expect(grade.accuracyPercent).toBe(100);
  });
});
