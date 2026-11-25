import { useEffect } from 'react';
import {
  BookOpen,
  Flame,
  Home,
  PauseCircle,
  ShieldCheck,
  Timer,
  Trophy,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { getInspectionDateLabel } from '../../utils/dates';
import { LEVEL_DURATION_SECONDS } from '../../utils/scoring';

const STAGE_META: Record<
  'level1' | 'level2' | 'level3',
  { num: number; shortTitle: string; subtopic: string }
> = {
  level1: { num: 1, shortTitle: 'Staff Hygiene Check', subtopic: '2.2' },
  level2: { num: 2, shortTitle: 'Commercial Kitchen Audit', subtopic: '2.1 & 2.2' },
  level3: { num: 3, shortTitle: 'Cold-Chain Storage Audit', subtopic: '2.3' },
};

export function GameHUD() {
  const currentStage = useGameStore((s) => s.currentStage);
  const gameMode = useGameStore((s) => s.gameMode);
  const playerName = useGameStore((s) => s.playerName);
  const playerClass = useGameStore((s) => s.playerClass);
  const score = useGameStore((s) => s.score);
  const streak = useGameStore((s) => s.streak);
  const timeLeft = useGameStore((s) => s.timeLeft);
  const isTimerActive = useGameStore((s) => s.isTimerActive);
  const isRulebookOpen = useGameStore((s) => s.isRulebookOpen);
  const activeModalHotspot = useGameStore((s) => s.activeModalHotspot);
  const pendingLevelRecap = useGameStore((s) => s.pendingLevelRecap);
  const isMuted = useGameStore((s) => s.isMuted);
  const tickTimer = useGameStore((s) => s.tickTimer);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const setRulebookOpen = useGameStore((s) => s.setRulebookOpen);
  const resetGame = useGameStore((s) => s.resetGame);

  const isPlayableStage =
    currentStage === 'level1' ||
    currentStage === 'level2' ||
    currentStage === 'level3';

  useEffect(() => {
    if (!isPlayableStage || gameMode === 'practice') return;
    const interval = window.setInterval(() => {
      tickTimer();
    }, 1000);
    return () => window.clearInterval(interval);
  }, [isPlayableStage, gameMode, tickTimer]);

  if (!isPlayableStage) return null;

  const meta = STAGE_META[currentStage];
  const progressRatio = Math.max(0, Math.min(1, timeLeft / LEVEL_DURATION_SECONDS));
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progressRatio);
  const isLowTime = gameMode === 'timed' && timeLeft > 0 && timeLeft <= 25;
  const isPaused =
    gameMode === 'timed' &&
    timeLeft > 0 &&
    (!isTimerActive ||
      isRulebookOpen ||
      activeModalHotspot !== null ||
      pendingLevelRecap !== null);

  const mins = Math.floor(timeLeft / 60);
  const secs = String(timeLeft % 60).padStart(2, '0');

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md no-print">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-2.5 px-3 py-2.5 sm:px-5">
        {/* Left: Inspector Identity & Stage */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-kkm-blue text-white shadow-sm">
            <ShieldCheck className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="truncate text-sm font-bold text-slate-900 max-w-[130px] sm:max-w-[200px]">
                {playerName}
              </span>
              <span className="rounded bg-slate-100 px-1.5 py-0.5 font-mono-tech text-[11px] font-semibold text-slate-600">
                {playerClass}
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-semibold text-kkm-teal">
                Level {meta.num}/3: {meta.shortTitle}
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden font-mono-tech sm:inline">
                Date: {getInspectionDateLabel()}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Level Progress Stepper (desktop) */}
        <div className="hidden items-center gap-1.5 lg:flex">
          {([1, 2, 3] as const).map((lvl) => {
            const active = meta.num === lvl;
            const done = meta.num > lvl;
            return (
              <div
                key={lvl}
                className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold transition ${
                  active
                    ? 'bg-kkm-blue text-white shadow-sm'
                    : done
                      ? 'bg-kkm-green-soft text-kkm-green'
                      : 'bg-slate-100 text-slate-400'
                }`}
              >
                <span className="font-mono-tech">L{lvl}</span>
                <span className="text-[11px]">
                  {lvl === 1 ? 'Staff' : lvl === 2 ? 'Kitchen' : 'Storage'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Right: Score, Streak, Timer & Quick Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Score & Streak */}
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-1.5">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-kkm-amber" />
              <span className="font-mono-tech text-sm font-bold text-slate-900">
                {score}
              </span>
            </div>
            {streak > 0 && (
              <div
                className="flex items-center gap-0.5 rounded-md bg-amber-100 px-1.5 py-0.5 font-mono-tech text-xs font-bold text-kkm-amber"
                title="Consecutive correct answers streak"
              >
                <Flame className="h-3.5 w-3.5 fill-amber-500 text-amber-600" />
                x{streak}
              </div>
            )}
          </div>

          {/* Timer Ring / Practice Badge */}
          {gameMode === 'practice' ? (
            <div className="flex items-center gap-1.5 rounded-xl border border-kkm-teal/30 bg-kkm-teal-soft px-2.5 py-1.5 text-xs font-bold text-kkm-teal">
              <Timer className="h-4 w-4" />
              <span className="hidden sm:inline">Practice Mode</span>
            </div>
          ) : (
            <div
              className={`flex items-center gap-1.5 rounded-xl border px-2 py-1 ${
                timeLeft === 0
                  ? 'border-red-200 bg-kkm-red-soft text-kkm-red'
                  : isLowTime
                    ? 'border-red-300 bg-red-50 text-kkm-red animate-pulse'
                    : isPaused
                      ? 'border-amber-200 bg-amber-50 text-kkm-amber'
                      : 'border-slate-200 bg-white text-slate-800'
              }`}
              title={
                isPaused
                  ? 'Timer is paused while reading notes or feedback'
                  : 'Level time bonus countdown'
              }
            >
              <svg className="h-9 w-9 -rotate-90" viewBox="0 0 40 40">
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.16"
                  strokeWidth="3.5"
                />
                <circle
                  cx="20"
                  cy="20"
                  r={radius}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={circumference}
                  strokeDashoffset={dashOffset}
                  className="transition-all duration-500"
                />
              </svg>
              <div className="pr-1 leading-tight">
                <div className="font-mono-tech text-sm font-bold">
                  {mins}:{secs}
                </div>
                <div className="flex items-center gap-0.5 text-[10px] font-semibold uppercase tracking-wide">
                  {timeLeft === 0 ? (
                    'Ended'
                  ) : isPaused ? (
                    <>
                      <PauseCircle className="h-2.5 w-2.5" /> Paused
                    </>
                  ) : (
                    'Time'
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <button
            type="button"
            onClick={() => setRulebookOpen(true)}
            className="flex items-center gap-1.5 rounded-xl border border-kkm-teal/30 bg-kkm-teal-soft px-2.5 py-2 text-xs font-bold text-kkm-teal transition hover:bg-kkm-teal hover:text-white"
            title="Open MOH Sanitation Handbook"
          >
            <BookOpen className="h-4 w-4" />
            <span className="hidden md:inline">Handbook</span>
          </button>

          <button
            type="button"
            onClick={toggleMute}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
            title={isMuted ? 'Sound Muted' : 'Sound Active'}
          >
            {isMuted ? (
              <VolumeX className="h-4 w-4 text-slate-400" />
            ) : (
              <Volume2 className="h-4 w-4 text-kkm-blue" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              if (
                window.confirm(
                  'Return to Main Menu? Your current inspection progress will be reset.'
                )
              ) {
                resetGame();
              }
            }}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-kkm-red"
            aria-label="Main Menu"
            title="Return to Main Menu"
          >
            <Home className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Timeout Banner */}
      {gameMode === 'timed' && timeLeft === 0 && (
        <div className="border-t border-red-200 bg-kkm-red-soft px-4 py-1.5 text-center text-xs font-semibold text-kkm-red">
          Time bonus expired! You can still finish inspecting the remaining items for
          full academic accuracy credit (without time bonus points).
        </div>
      )}
    </header>
  );
}
