import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Radar,
  ScanSearch,
} from 'lucide-react';
import { level2KitchenHotspots } from '../../data/syllabusContent';
import { useGameStore } from '../../store/useGameStore';
import type { KitchenHotspot } from '../../types/game';
import { playClickSound } from '../../utils/sound';
import { HotspotQuizModal } from '../modals/HotspotQuizModal';

export function Level2KitchenAudit() {
  const answers = useGameStore((s) => s.answers);
  const setActiveModalHotspot = useGameStore((s) => s.setActiveModalHotspot);
  const completeCurrentLevel = useGameStore((s) => s.completeCurrentLevel);

  const inspectedCount = level2KitchenHotspots.filter((hs) =>
    Boolean(answers[hs.id])
  ).length;
  const allInspected = inspectedCount === level2KitchenHotspots.length;

  const openPin = (hotspot: KitchenHotspot) => {
    playClickSound();
    setActiveModalHotspot(hotspot);
  };

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-5">
      {/* Header Banner */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-kkm-teal px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
              SUBTOPICS 2.1 &amp; 2.2
            </span>
            <span className="text-xs font-semibold text-kkm-blue">
              Commercial Kitchen Visual Audit
            </span>
          </div>
          <h1 className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
            Scan &amp; Evaluate 8 Kitchen Inspection Hotspots
          </h1>
          <p className="text-xs text-slate-600">
            Click each pulsing amber pin on the kitchen floorplan (or pick from the
            checklist below). Stay sharp: some stations are{' '}
            <strong>compliant</strong> while others are <strong>violations</strong>!
          </p>
        </div>

        {/* Real-time HUD Counter */}
        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-kkm-teal/30 bg-kkm-teal-soft px-4 py-2 text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-kkm-teal">
              Audit Progress
            </div>
            <div className="font-mono-tech text-base font-extrabold text-kkm-blue">
              Pins Inspected: {inspectedCount} / {level2KitchenHotspots.length}
            </div>
          </div>
          {allInspected && (
            <button
              type="button"
              onClick={() =>
                completeCurrentLevel(2, level2KitchenHotspots.length)
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-kkm-blue px-4 py-3 text-xs font-bold text-white shadow-sm hover:bg-kkm-blue-dark"
            >
              Summary
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Legend */}
      <div className="mb-3 flex flex-wrap items-center gap-4 px-1 text-xs font-semibold text-slate-600">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-amber-500" />
          Uninspected
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-kkm-green" />
          Correctly Resolved
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-kkm-red" />
          Incorrectly Resolved
        </span>
      </div>

      {/* Interactive Commercial Kitchen SVG Canvas */}
      <div className="relative overflow-hidden rounded-2xl border-2 border-slate-300 bg-slate-100 shadow-md">
        <div className="relative aspect-[16/9] w-full min-h-[260px]">
          <svg
            viewBox="0 0 1000 562"
            className="h-full w-full select-none"
            role="img"
            aria-label="Commercial kitchen floorplan with 4 sanitation zones"
          >
            <defs>
              <pattern
                id="tileGrid"
                width="32"
                height="32"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 32 0 L 0 0 0 32"
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="1000" height="390" fill="#f8fafc" />
            <rect width="1000" height="390" fill="url(#tileGrid)" />

            {/* Kitchen Floor */}
            <rect y="390" width="1000" height="172" fill="#e2e8f0" />
            <line x1="0" y1="390" x2="1000" y2="390" stroke="#94a3b8" strokeWidth="3" />

            {/* Zone Dividers */}
            <line x1="305" y1="20" x2="305" y2="545" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 6" />
            <line x1="565" y1="20" x2="565" y2="545" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 6" />
            <line x1="825" y1="20" x2="825" y2="545" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 6" />

            {/* Zone Header Tags */}
            <g fontWeight="700" fontSize="13">
              <rect x="20" y="16" width="145" height="28" rx="8" fill="#1e3a8a" />
              <text x="92" y="35" textAnchor="middle" fill="#ffffff">1. WASHING ZONE</text>

              <rect x="325" y="16" width="135" height="28" rx="8" fill="#0f766e" />
              <text x="392" y="35" textAnchor="middle" fill="#ffffff">2. PREP ZONE</text>

              <rect x="585" y="16" width="150" height="28" rx="8" fill="#b45309" />
              <text x="660" y="35" textAnchor="middle" fill="#ffffff">3. COOKING ZONE</text>

              <rect x="845" y="16" width="130" height="28" rx="8" fill="#475569" />
              <text x="910" y="35" textAnchor="middle" fill="#ffffff">4. WASTE ZONE</text>
            </g>

            {/* === ZONE 1: WASHING AREA === */}
            <g>
              <rect x="195" y="130" width="90" height="90" rx="8" fill="#e0f2fe" stroke="#0284c7" strokeWidth="2" />
              <rect x="208" y="142" width="24" height="30" rx="4" fill="#0ea5e9" />
              <text x="220" y="161" textAnchor="middle" fill="#fff" fontSize="8" fontWeight="700">SOAP</text>
              <rect x="242" y="142" width="32" height="26" rx="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1.5" />
              <rect x="249" y="168" width="18" height="8" fill="#f1f5f9" />
              <path d="M206 196 h68 v14 a12 12 0 0 1 -12 12 h-44 a12 12 0 0 1 -12 -12 z" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
              <text x="240" y="236" textAnchor="middle" fill="#0369a1" fontSize="10" fontWeight="700">HANDWASH BASIN</text>
            </g>

            <g>
              <rect x="30" y="255" width="235" height="36" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
              <rect x="44" y="255" width="95" height="24" fill="#94a3b8" />
              <path d="M90 255 v-26 q0 -14 14 -14 h12" fill="none" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
              <rect x="38" y="291" width="10" height="125" fill="#64748b" />
              <rect x="248" y="291" width="10" height="125" fill="#64748b" />
              <rect x="86" y="291" width="14" height="50" fill="#475569" />
              <rect x="64" y="340" width="155" height="72" rx="8" fill="#78350f" stroke="#451a03" strokeWidth="3" />
              <rect x="74" y="352" width="135" height="26" rx="4" fill="#b45309" opacity="0.85" />
              <ellipse cx="142" cy="365" rx="48" ry="8" fill="#fde047" opacity="0.5" />
              <text x="142" y="398" textAnchor="middle" fill="#fef3c7" fontSize="11" fontWeight="700">GREASE TRAP</text>
              <path d="M112 332 q4 -8 0 -16 M142 332 q4 -8 0 -16 M172 332 q4 -8 0 -16" fill="none" stroke="#a16207" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* === ZONE 2: PREP COUNTERS === */}
            <g>
              <rect x="325" y="280" width="220" height="26" rx="4" fill="#cbd5e1" stroke="#64748b" strokeWidth="2" />
              <rect x="335" y="306" width="10" height="118" fill="#64748b" />
              <rect x="525" y="306" width="10" height="118" fill="#64748b" />
              <rect x="335" y="378" width="200" height="10" fill="#94a3b8" />

              <rect x="342" y="252" width="68" height="28" rx="4" fill="#fecaca" stroke="#dc2626" strokeWidth="2" />
              <ellipse cx="376" cy="264" rx="22" ry="9" fill="#fca5a5" stroke="#b91c1c" strokeWidth="1.5" />
              <text x="376" y="245" textAnchor="middle" fill="#b91c1c" fontSize="9.5" fontWeight="700">RAW CHICKEN</text>

              <rect x="418" y="252" width="68" height="28" rx="4" fill="#ffffff" stroke="#64748b" strokeWidth="2" />
              <ellipse cx="452" cy="262" rx="22" ry="9" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.5" />
              <text x="452" y="245" textAnchor="middle" fill="#334155" fontSize="9.5" fontWeight="700">COOKED RICE</text>

              <path d="M405 266 h16" stroke="#dc2626" strokeWidth="3" strokeDasharray="3 2" />

              <g transform="translate(465, 344)">
                <rect x="0" y="0" width="76" height="32" rx="5" fill="#d97706" stroke="#78350f" strokeWidth="2" />
                <path d="M18 4 L28 18 L24 30 M48 2 L42 15 L54 28" stroke="#1c1917" strokeWidth="2.4" fill="none" />
                <circle cx="34" cy="22" r="4" fill="#365314" opacity="0.8" />
                <circle cx="56" cy="12" r="3.5" fill="#365314" opacity="0.8" />
              </g>
              <text x="503" y="405" textAnchor="middle" fill="#78350f" fontSize="9.5" fontWeight="700">CRACKED BOARD</text>
            </g>

            {/* === ZONE 3: COOKING RANGE === */}
            <g>
              <path d="M600 95 L775 95 L805 162 L575 162 Z" fill="#94a3b8" stroke="#475569" strokeWidth="2.5" />
              <rect x="655" y="48" width="65" height="48" fill="#64748b" />
              <rect x="590" y="150" width="198" height="12" fill="#451a03" opacity="0.85" />
              <path d="M635 166 q-4 10 0 14 q4 -4 0 -14 Z" fill="#78350f" />
              <path d="M715 170 q-4 10 0 14 q4 -4 0 -14 Z" fill="#78350f" />
              <text x="688" y="136" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="700">EXHAUST HOOD</text>

              <rect x="645" y="295" width="160" height="125" rx="6" fill="#475569" stroke="#1e293b" strokeWidth="2" />
              <rect x="658" y="310" width="134" height="18" rx="4" fill="#1e293b" />
              <rect x="702" y="250" width="76" height="46" rx="6" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
              <ellipse cx="740" cy="252" rx="34" ry="8" fill="#ea580c" />
              <line x1="744" y1="252" x2="778" y2="215" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
              <circle cx="779" cy="214" r="6" fill="#fb923c" />
              <text x="740" y="365" textAnchor="middle" fill="#cbd5e1" fontSize="11" fontWeight="700">COMMERCIAL RANGE</text>

              <g>
                <rect x="576" y="350" width="60" height="72" fill="none" stroke="#0f766e" strokeWidth="2.5" />
                <line x1="576" y1="382" x2="636" y2="382" stroke="#0f766e" strokeWidth="2.5" />
                <path d="M584 382 v-18 h20 v18" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.5" />
                <path d="M610 382 v-14 h18 v14" fill="#e2e8f0" stroke="#0f766e" strokeWidth="1.5" />
                <text x="606" y="438" textAnchor="middle" fill="#0f766e" fontSize="9.5" fontWeight="700">RACK ≥15cm</text>
              </g>
            </g>

            {/* === ZONE 4: WASTE DISPOSAL === */}
            <g>
              <path d="M862 320 L934 320 L924 426 L872 426 Z" fill="#64748b" stroke="#334155" strokeWidth="2.5" />
              <ellipse cx="898" cy="316" rx="34" ry="14" fill="#84cc16" opacity="0.8" />
              <circle cx="884" cy="308" r="9" fill="#ca8a04" />
              <circle cx="910" cy="306" r="10" fill="#a16207" />
              <circle cx="876" cy="285" r="2.5" fill="#0f172a" />
              <circle cx="918" cy="280" r="2.5" fill="#0f172a" />
              <circle cx="898" cy="272" r="2.5" fill="#0f172a" />
              <text x="898" y="446" textAnchor="middle" fill="#b91c1c" fontSize="10.5" fontWeight="700">LIDLESS BIN</text>
            </g>
          </svg>

          {/* Interactive Coordinate Pins Layer */}
          {level2KitchenHotspots.map((hs) => {
            const ans = answers[hs.id];
            const isResolved = Boolean(ans);
            const isCorrect = ans?.isCorrect;

            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => openPin(hs)}
                style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
                aria-label={`Pin ${hs.pinNumber}: ${hs.title}`}
              >
                {!isResolved && (
                  <span className="pointer-events-none absolute inset-0 -m-1 rounded-full bg-amber-400 animate-radar-ping" />
                )}

                <span
                  className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-white font-mono-tech text-xs font-extrabold text-white shadow-lg transition group-hover:scale-110 sm:h-9 sm:w-9 ${
                    !isResolved
                      ? 'bg-kkm-amber'
                      : isCorrect
                        ? 'bg-kkm-green'
                        : 'bg-kkm-red'
                  }`}
                >
                  {!isResolved ? (
                    hs.pinNumber
                  ) : isCorrect ? (
                    <CheckCircle2 className="h-5 w-5" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                </span>

                <span className="pointer-events-none absolute bottom-full left-1/2 mb-2 hidden -translate-x-1/2 whitespace-nowrap rounded-lg bg-slate-900/95 px-2.5 py-1 text-[11px] font-semibold text-white shadow-lg group-hover:block">
                  #{hs.pinNumber} {hs.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Companion Inspection Checklist Strip */}
      <div className="mt-5">
        <div className="mb-2.5 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
          <ScanSearch className="h-4 w-4 text-kkm-teal" />
          Inspection Hotspots List (Tap Any Card to Audit)
        </div>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {level2KitchenHotspots.map((hs) => {
            const ans = answers[hs.id];
            return (
              <button
                key={hs.id}
                type="button"
                onClick={() => openPin(hs)}
                className={`flex items-start gap-3 rounded-xl border p-3 text-left transition ${
                  !ans
                    ? 'border-amber-200 bg-white hover:border-kkm-amber hover:bg-kkm-amber-soft/60'
                    : ans.isCorrect
                      ? 'border-green-200 bg-kkm-green-soft/60'
                      : 'border-red-200 bg-kkm-red-soft/60'
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono-tech text-xs font-extrabold text-white ${
                    !ans
                      ? 'bg-kkm-amber'
                      : ans.isCorrect
                        ? 'bg-kkm-green'
                        : 'bg-kkm-red'
                  }`}
                >
                  {!ans ? (
                    hs.pinNumber
                  ) : ans.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <AlertTriangle className="h-4 w-4" />
                  )}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-slate-500">
                    <span>{hs.zoneLabel}</span>
                    <span>•</span>
                    <span className="font-mono-tech">{hs.subtopic}</span>
                  </div>
                  <div className="mt-0.5 line-clamp-2 text-xs font-bold text-slate-900">
                    {hs.title}
                  </div>
                  {!ans && (
                    <div className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-kkm-amber">
                      <Radar className="h-3 w-3" />
                      Needs Audit
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <HotspotQuizModal />
    </div>
  );
}
