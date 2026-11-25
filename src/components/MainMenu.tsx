import { useState, type FormEvent } from 'react';
import {
  BookOpen,
  ClipboardCheck,
  Clock,
  GraduationCap,
  Play,
  ShieldCheck,
  Sparkles,
  ThermometerSnowflake,
  UserCheck,
  UtensilsCrossed,
} from 'lucide-react';
import { useGameStore } from '../store/useGameStore';
import type { GameMode } from '../types/game';
import { getInspectionDateLabel } from '../utils/dates';
import { playClickSound } from '../utils/sound';

export function MainMenu() {
  const savedName = useGameStore((s) => s.playerName);
  const savedClass = useGameStore((s) => s.playerClass);
  const startGame = useGameStore((s) => s.startGame);
  const setRulebookOpen = useGameStore((s) => s.setRulebookOpen);

  const [name, setName] = useState(savedName);
  const [playerClass, setPlayerClass] = useState(savedClass || 'Form 5 SRT');
  const [mode, setMode] = useState<GameMode>('timed');

  const canStart = name.trim().length >= 2;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!canStart) return;
    playClickSound();
    startGame(name, playerClass, mode);
  };

  return (
    <div className="min-h-screen bg-inspection-grid px-4 py-6 sm:px-6 lg:py-10">
      <div className="mx-auto max-w-5xl">
        {/* Top Ministry Banner */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-kkm-blue/15 bg-white px-5 py-3.5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-kkm-blue text-white shadow-sm">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-kkm-teal">
                KSSM Educational Simulation • Home Science (SRT) Form 5
              </p>
              <h1 className="text-lg font-extrabold tracking-tight text-kkm-blue sm:text-xl">
                MOH Kitchen Inspector: Food Sanitation Mission
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-lg bg-slate-100 px-3 py-1.5 font-mono-tech text-xs font-semibold text-slate-700">
            <ClipboardCheck className="h-4 w-4 text-kkm-teal" />
            Audit Date: {getInspectionDateLabel()}
          </div>
        </div>

        {/* Main 2-column Dashboard */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Left: Mission Brief & Syllabus Cards */}
          <div className="space-y-5 lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-kkm-teal-soft px-3 py-1 text-xs font-bold text-kkm-teal">
                <GraduationCap className="h-3.5 w-3.5" />
                Chapter 2: Sanitation in Food Preparation and Storage
              </div>
              <h2 className="mb-2 text-2xl font-extrabold leading-tight text-slate-900">
                Conduct a Commercial Kitchen Audit Under MOH Standards
              </h2>
              <p className="text-sm leading-relaxed text-slate-600">
                You are assigned as a <strong>Junior Health Inspector</strong> to audit a
                commercial kitchen across 3 interactive stages. Identify hygiene
                violations, verify cold-chain storage and FIFO rules, and earn your{' '}
                <strong>Junior Kitchen Inspector Certificate</strong>!
              </p>

              {/* Subtopic Badges */}
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-md bg-kkm-blue px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                      2.2
                    </span>
                    <UserCheck className="h-4 w-4 text-kkm-blue" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    Level 1: Staff Checkpoint
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                    Inspect attire, personal hygiene &amp; Typhoid vaccination cards (6 staff).
                  </p>
                </div>

                <div className="rounded-xl border border-teal-100 bg-teal-50/60 p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-md bg-kkm-teal px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                      2.1
                    </span>
                    <UtensilsCrossed className="h-4 w-4 text-kkm-teal" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    Level 2: Kitchen Audit
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                    Scan 8 inspection pins across 4 commercial kitchen zones.
                  </p>
                </div>

                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3.5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="rounded-md bg-kkm-amber px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                      2.3
                    </span>
                    <ThermometerSnowflake className="h-4 w-4 text-kkm-amber" />
                  </div>
                  <div className="text-xs font-bold text-slate-900">
                    Level 3: Cold-Chain Audit
                  </div>
                  <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
                    Audit Chiller, Freezer, Dry Store temperatures &amp; FIFO rules.
                  </p>
                </div>
              </div>
            </div>

            {/* Grading Criteria Preview */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Premises Grading Standards (Based on Audit Accuracy)
              </h3>
              <div className="grid gap-2.5 sm:grid-cols-3 text-xs">
                <div className="rounded-xl border border-green-200 bg-kkm-green-soft p-3">
                  <div className="font-mono-tech font-extrabold text-kkm-green">
                    GRADE A (≥ 85%)
                  </div>
                  <div className="mt-0.5 text-slate-700">
                    Distinguished Inspector / 5-Star Premises
                  </div>
                </div>
                <div className="rounded-xl border border-amber-200 bg-kkm-amber-soft p-3">
                  <div className="font-mono-tech font-extrabold text-kkm-amber">
                    GRADE B (60% – 84%)
                  </div>
                  <div className="mt-0.5 text-slate-700">
                    Pass / Improvement Notice Issued
                  </div>
                </div>
                <div className="rounded-xl border border-red-200 bg-kkm-red-soft p-3">
                  <div className="font-mono-tech font-extrabold text-kkm-red">
                    GRADE C (&lt; 60%)
                  </div>
                  <div className="mt-0.5 text-slate-700">
                    Failed / Closure Order (Section 11)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Registration Form & Start CTA */}
          <div className="lg:col-span-5">
            <form
              onSubmit={handleSubmit}
              className="flex h-full flex-col justify-between rounded-2xl border-2 border-kkm-blue/20 bg-white p-6 shadow-md"
            >
              <div>
                <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Sparkles className="h-5 w-5 text-kkm-teal" />
                  <h2 className="text-base font-extrabold text-slate-900">
                    Junior Inspector Registration
                  </h2>
                </div>

                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="playerName"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-700"
                    >
                      Student Name <span className="text-kkm-red">*</span>
                    </label>
                    <input
                      id="playerName"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Aisyah Ahmad"
                      maxLength={50}
                      required
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-kkm-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-kkm-blue/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="playerClass"
                      className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-700"
                    >
                      Form / Class
                    </label>
                    <input
                      id="playerClass"
                      type="text"
                      value={playerClass}
                      onChange={(e) => setPlayerClass(e.target.value)}
                      placeholder="Form 5 SRT"
                      maxLength={20}
                      className="w-full rounded-xl border border-slate-300 bg-slate-50 px-3.5 py-2.5 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:border-kkm-blue focus:bg-white focus:outline-none focus:ring-2 focus:ring-kkm-blue/20"
                    />
                  </div>

                  {/* Mode Toggle */}
                  <div>
                    <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-slate-700">
                      Inspection Mode
                    </span>
                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setMode('timed');
                        }}
                        className={`rounded-xl border p-3 text-left transition ${
                          mode === 'timed'
                            ? 'border-kkm-blue bg-kkm-blue-soft ring-2 ring-kkm-blue/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-kkm-blue">
                          <Clock className="h-3.5 w-3.5" />
                          Timed Mission
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-600">
                          120s/level + time bonus (auto-pauses while reading notes).
                        </p>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setMode('practice');
                        }}
                        className={`rounded-xl border p-3 text-left transition ${
                          mode === 'practice'
                            ? 'border-kkm-teal bg-kkm-teal-soft ring-2 ring-kkm-teal/20'
                            : 'border-slate-200 bg-white hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 text-xs font-bold text-kkm-teal">
                          <BookOpen className="h-3.5 w-3.5" />
                          Practice Mode
                        </div>
                        <p className="mt-0.5 text-[11px] text-slate-600">
                          No timer. Ideal for classroom revision &amp; study.
                        </p>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 space-y-2.5">
                <button
                  type="submit"
                  disabled={!canStart}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-kkm-blue px-5 py-3.5 text-sm font-extrabold tracking-wide text-white shadow-md transition hover:bg-kkm-blue-dark disabled:cursor-not-allowed disabled:bg-slate-300 disabled:shadow-none"
                >
                  <Play className="h-4 w-4 fill-current" />
                  START INSPECTION
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setRulebookOpen(true);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-kkm-teal/35 bg-kkm-teal-soft px-5 py-3 text-sm font-bold text-kkm-teal transition hover:bg-kkm-teal hover:text-white"
                >
                  <BookOpen className="h-4 w-4" />
                  MOH Sanitation Handbook
                </button>

                <p className="pt-1 text-center text-[11px] text-slate-400">
                  Your name will appear on the final Audit Report &amp; printable
                  Junior Inspector Certificate.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
