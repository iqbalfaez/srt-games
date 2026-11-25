import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  Award,
  BookOpenCheck,
  CheckCircle2,
  Flame,
  Printer,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trophy,
  XCircle,
} from 'lucide-react';
import {
  getSubtopicTotals,
  TOTAL_GAME_ITEMS,
} from '../data/syllabusContent';
import { useGameStore } from '../store/useGameStore';
import {
  generateCertificateCode,
  getInspectionDateLabel,
} from '../utils/dates';
import {
  calculateGrade,
  calculateSubtopicMastery,
} from '../utils/scoring';
import { playClickSound, playVictoryFanfare } from '../utils/sound';

export function AuditReport() {
  const playerName = useGameStore((s) => s.playerName) || 'Junior Inspector';
  const playerClass = useGameStore((s) => s.playerClass) || 'Form 5 SRT';
  const score = useGameStore((s) => s.score);
  const bestStreak = useGameStore((s) => s.bestStreak);
  const answers = useGameStore((s) => s.answers);
  const mistakes = useGameStore((s) => s.mistakes);
  const resetGame = useGameStore((s) => s.resetGame);

  const allAnswers = Object.values(answers);
  const correctCount = allAnswers.filter((a) => a.isCorrect).length;
  const gradeInfo = calculateGrade(correctCount, TOTAL_GAME_ITEMS);
  const masteryList = calculateSubtopicMastery(answers, getSubtopicTotals());
  const certCode = generateCertificateCode(playerName);
  const inspectionDate = getInspectionDateLabel();

  useEffect(() => {
    if (gradeInfo.grade === 'A' || gradeInfo.grade === 'B') {
      playVictoryFanfare();
      try {
        void confetti({
          particleCount: gradeInfo.grade === 'A' ? 90 : 45,
          spread: 75,
          origin: { y: 0.55 },
          colors: ['#1e3a8a', '#0f766e', '#15803d', '#f59e0b'],
        });
      } catch {
        // Ignore confetti errors in headless/non-canvas environments
      }
    }
  }, [gradeInfo.grade]);

  const handlePrint = () => {
    playClickSound();
    window.print();
  };

  const handleReplay = () => {
    playClickSound();
    resetGame();
  };

  return (
    <div className="min-h-screen bg-inspection-grid px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Top Action Bar (Hidden on Print) */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm no-print">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-kkm-blue text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 sm:text-lg">
                Food Premises Sanitation Audit Report
              </h1>
              <p className="text-xs text-slate-500">
                KSSM Home Science (SRT) Form 5 • Chapter 2
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-xl bg-kkm-teal px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-teal-800"
            >
              <Printer className="h-4 w-4" />
              Print Certificate
            </button>
            <button
              type="button"
              onClick={handleReplay}
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-4 w-4" />
              Play Again
            </button>
          </div>
        </div>

        {/* Summary Grade & KPI Strip */}
        <div className="grid gap-4 md:grid-cols-12 no-print">
          <div className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-7">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Simulation Audit Result
                </span>
                <h2 className="mt-1 text-2xl font-extrabold text-slate-900">
                  {gradeInfo.title}
                </h2>
                <p className="mt-1 text-xs font-medium text-slate-600">
                  {gradeInfo.subtitle}
                </p>
              </div>
              <div
                className={`flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl border-2 font-mono-tech shadow-sm ${gradeInfo.badgeColorClass}`}
              >
                <span className="text-[10px] font-bold uppercase">Grade</span>
                <span className="text-2xl font-black leading-none">
                  {gradeInfo.grade}
                </span>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-slate-100 pt-4">
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="text-[11px] font-semibold text-slate-500">
                  Accuracy
                </div>
                <div className="mt-0.5 font-mono-tech text-xl font-extrabold text-kkm-blue">
                  {gradeInfo.accuracyPercent}%
                </div>
                <div className="text-[11px] text-slate-500">
                  {correctCount}/{TOTAL_GAME_ITEMS} correct
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Trophy className="h-3.5 w-3.5 text-kkm-amber" />
                  Inspector Score
                </div>
                <div className="mt-0.5 font-mono-tech text-xl font-extrabold text-slate-900">
                  {score}
                </div>
                <div className="text-[11px] text-slate-500">
                  Includes bonuses
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <div className="flex items-center justify-center gap-1 text-[11px] font-semibold text-slate-500">
                  <Flame className="h-3.5 w-3.5 text-amber-500" />
                  Best Streak
                </div>
                <div className="mt-0.5 font-mono-tech text-xl font-extrabold text-kkm-amber">
                  x{bestStreak}
                </div>
                <div className="text-[11px] text-slate-500">In a row</div>
              </div>
            </div>
          </div>

          {/* Subtopic Mastery Bars */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:col-span-5">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500">
              KSSM Chapter 2 Subtopic Mastery
            </h3>
            <div className="space-y-4">
              {masteryList.map((m) => (
                <div key={m.code}>
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800">
                      <span className="mr-1.5 rounded bg-slate-100 px-1.5 py-0.5 font-mono-tech text-[11px] text-kkm-blue">
                        {m.code}
                      </span>
                      {m.title}
                    </span>
                    <span className="font-mono-tech font-extrabold text-slate-900">
                      {m.percentage}% ({m.correct}/{m.total})
                    </span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        m.percentage >= 85
                          ? 'bg-kkm-green'
                          : m.percentage >= 60
                            ? 'bg-kkm-amber'
                            : 'bg-kkm-red'
                      }`}
                      style={{ width: `${m.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Printable Junior Inspector Certificate */}
        <section
          aria-label="Junior Kitchen Inspector Certificate"
          className="print-only-certificate rounded-2xl border-4 border-double border-kkm-blue bg-white p-6 shadow-md sm:p-10"
        >
          <div className="rounded-xl border-2 border-kkm-teal/40 p-6 sm:p-8">
            {/* Certificate Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-slate-200 pb-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-kkm-blue text-white">
                  <ShieldCheck className="h-8 w-8" />
                </div>
                <div>
                  <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-kkm-teal">
                    KSSM Home Science Form 5 Educational Simulation
                  </div>
                  <h2 className="text-2xl font-black tracking-tight text-kkm-blue sm:text-3xl">
                    JUNIOR KITCHEN INSPECTOR CERTIFICATE
                  </h2>
                </div>
              </div>
              <div className="text-right font-mono-tech text-xs text-slate-600">
                <div className="font-bold text-kkm-blue">Serial No.: {certCode}</div>
                <div>Date: {inspectionDate}</div>
              </div>
            </div>

            {/* Recipient Body */}
            <div className="my-7 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                This is to certify that
              </p>
              <div className="mx-auto mt-2 inline-block border-b-2 border-kkm-teal/50 px-6 pb-1.5 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl">
                {playerName}
              </div>
              <p className="mt-2 font-mono-tech text-sm font-bold text-kkm-teal">
                Form / Class: {playerClass}
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-700">
                has successfully completed the commercial food premises sanitation audit
                simulation for{' '}
                <strong>
                  KSSM Home Science (SRT) Form 5 — Chapter 2: Sanitation in Food
                  Preparation and Storage
                </strong>{' '}
                (Subtopics 2.1, 2.2 &amp; 2.3) with the following achievement:
              </p>
            </div>

            {/* Achievement Strip */}
            <div className="mx-auto grid max-w-3xl grid-cols-3 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
              <div>
                <div className="text-[11px] font-bold uppercase text-slate-500">
                  Audit Grade
                </div>
                <div className="mt-1 font-mono-tech text-xl font-black text-kkm-blue">
                  GRADE {gradeInfo.grade}
                </div>
                <div className="text-[11px] font-semibold text-slate-600">
                  Accuracy {gradeInfo.accuracyPercent}% ({correctCount}/{TOTAL_GAME_ITEMS})
                </div>
              </div>

              <div className="border-x border-slate-200 px-2">
                <div className="text-[11px] font-bold uppercase text-slate-500">
                  Total Score
                </div>
                <div className="mt-1 font-mono-tech text-xl font-black text-kkm-teal">
                  {score} PTS
                </div>
                <div className="text-[11px] font-semibold text-slate-600">
                  Best Streak: x{bestStreak}
                </div>
              </div>

              <div>
                <div className="text-[11px] font-bold uppercase text-slate-500">
                  Subtopic Mastery
                </div>
                <div className="mt-1 flex items-center justify-center gap-2 font-mono-tech text-xs font-extrabold text-slate-800">
                  {masteryList.map((m) => (
                    <span
                      key={m.code}
                      className="rounded border border-slate-200 bg-white px-1.5 py-0.5"
                    >
                      {m.code}: {m.percentage}%
                    </span>
                  ))}
                </div>
                <div className="mt-1 text-[11px] font-semibold text-slate-600">
                  Hygiene, Handlers &amp; Storage
                </div>
              </div>
            </div>

            {/* Signature & Educational Disclaimer */}
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4 border-t border-slate-200 pt-5 text-xs">
              <div>
                <div className="font-mono-tech text-sm font-bold italic text-kkm-blue">
                  SRT Form 5 Simulation Panel
                </div>
                <div className="mt-1 border-t border-slate-400 pt-1 font-semibold text-slate-700">
                  KSSM Food Sanitation Module Coordinator
                </div>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-kkm-blue/20 bg-kkm-blue-soft px-3.5 py-2 text-kkm-blue">
                <Sparkles className="h-4 w-4 shrink-0" />
                <span className="font-bold">
                  {gradeInfo.grade === 'A'
                    ? '5-Star Premises — Distinguished!'
                    : gradeInfo.grade === 'B'
                      ? 'Passed — Keep Improving'
                      : 'Revision Needed — Try Again'}
                </span>
              </div>
            </div>

            <p className="mt-4 text-center text-[10px] text-slate-400">
              Note: This certificate is generated by an educational simulation for KSSM
              Home Science Form 5 classroom learning only and is not an official
              Ministry of Health Malaysia (MOH/KKM) document.
            </p>
          </div>
        </section>

        {/* Revision Checklist (Mistake Breakdown) */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm no-print">
          <div className="mb-4 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <BookOpenCheck className="h-5 w-5 text-kkm-blue" />
              <h3 className="text-base font-extrabold text-slate-900">
                Revision Checklist ({mistakes.length}{' '}
                {mistakes.length === 1 ? 'Mistake' : 'Mistakes'})
              </h3>
            </div>
          </div>

          {mistakes.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-kkm-green-soft p-8 text-center">
              <CheckCircle2 className="h-10 w-10 text-kkm-green" />
              <h4 className="mt-2 text-base font-extrabold text-kkm-green">
                Perfect 100%! Zero Mistakes Recorded
              </h4>
              <p className="mt-1 max-w-md text-xs text-slate-700">
                Congratulations! You accurately audited all {TOTAL_GAME_ITEMS} items
                across Subtopics 2.1, 2.2, and 2.3 under KSSM Form 5 food sanitation
                standards.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {mistakes.map((m) => (
                <div
                  key={`${m.level}-${m.id}`}
                  className="rounded-xl border border-red-200/80 bg-red-50/40 p-4"
                >
                  <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <XCircle className="h-4 w-4 text-kkm-red" />
                      <span className="text-sm font-bold text-slate-900">
                        {m.itemTitle}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 font-mono-tech text-[11px] font-bold">
                      <span className="rounded bg-slate-200 px-2 py-0.5 text-slate-700">
                        Level {m.level}
                      </span>
                      <span className="rounded bg-kkm-blue px-2 py-0.5 text-white">
                        Subtopic {m.subtopic}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-2 text-xs sm:grid-cols-2">
                    <div className="rounded-lg border border-red-200 bg-white p-2.5">
                      <span className="font-bold text-kkm-red">Your Answer: </span>
                      <span className="text-slate-700">{m.userChoice}</span>
                    </div>
                    <div className="rounded-lg border border-green-200 bg-white p-2.5">
                      <span className="font-bold text-kkm-green">
                        Correct Answer:{' '}
                      </span>
                      <span className="text-slate-800">{m.correctChoice}</span>
                    </div>
                  </div>

                  <p className="mt-2.5 text-xs leading-relaxed text-slate-700">
                    {m.explanation}
                  </p>
                  <div className="mt-1.5 font-mono-tech text-[11px] font-semibold text-kkm-blue">
                    Reference: {m.kssmReference}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
