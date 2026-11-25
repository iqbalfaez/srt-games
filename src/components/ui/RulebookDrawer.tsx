import {
  BookOpen,
  CheckCircle2,
  ShieldAlert,
  Thermometer,
  UserCheck,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';

export function RulebookDrawer() {
  const isOpen = useGameStore((s) => s.isRulebookOpen);
  const setOpen = useGameStore((s) => s.setRulebookOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/50 backdrop-blur-sm no-print"
      role="dialog"
      aria-modal="true"
      aria-label="MOH Sanitation Handbook"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative flex h-full w-full max-w-lg flex-col bg-white shadow-2xl animate-slide-in-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 bg-kkm-blue px-5 py-4 text-white">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/15">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold leading-tight">
                MOH Sanitation Handbook
              </h2>
              <p className="text-xs text-blue-100">
                Quick Reference • KSSM SRT Form 5 Chapter 2
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-blue-100 transition hover:bg-white/15 hover:text-white"
            aria-label="Close handbook"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5 text-sm text-slate-700">
          <div className="rounded-xl border border-kkm-teal/25 bg-kkm-teal-soft p-3.5 text-xs text-kkm-teal">
            <strong>Inspector Tip:</strong> The mission timer pauses automatically
            while you read this handbook. Use these official rules to make accurate
            audit decisions!
          </div>

          {/* Subtopic 2.1 */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-kkm-blue px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                2.1
              </span>
              <UtensilsCrossed className="h-4 w-4 text-kkm-blue" />
              <h3 className="font-bold text-slate-900">
                Kitchen Hygiene Practices (4 Sanitation Zones)
              </h3>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Washing Zone:</strong> Grease traps must be cleaned
                  regularly. Handwashing basins must be separate from raw-food sinks
                  and stocked with liquid soap and disposable paper towels.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Prep &amp; Cutting Zone:</strong> Strictly separate raw
                  ingredients from cooked/ready-to-eat foods (prevent
                  cross-contamination). Use color-coded cutting boards; discard
                  cracked or moldy wooden boards.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Cooking Zone:</strong> Keep exhaust hoods clean and free of
                  dripping grease. Air-dry sanitized cookware and store inverted at
                  least 15 cm off the floor.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Waste Zone:</strong> Trash bins must have tight-fitting
                  lids, foot pedals, plastic liners, and be emptied before
                  overflowing.
                </span>
              </li>
            </ul>
          </section>

          {/* Subtopic 2.2 */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-kkm-teal px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                2.2
              </span>
              <UserCheck className="h-4 w-4 text-kkm-teal" />
              <h3 className="font-bold text-slate-900">
                Food Handler Hygiene &amp; Attire Standards
              </h3>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-green" />
                <span>
                  <strong>Regulations 30 &amp; 31 (FHR 2009):</strong> Food handlers
                  must complete Food Handler Training (SLPM) and hold a valid{' '}
                  <strong>Typhoid vaccination</strong> (renewed every 3 years).
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-green" />
                <span>
                  <strong>Regulation 32 (Attire):</strong> Clean light-colored apron,
                  proper hairnet/head covering, and{' '}
                  <strong>closed non-slip shoes</strong> (open slippers are
                  prohibited).
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-green" />
                <span>
                  <strong>Regulation 33 (Personal Hygiene):</strong> Short clean
                  nails, <strong>no jewelry</strong> (rings/bangles/watches), minor
                  cuts sealed with a <strong>waterproof plaster</strong> + clean
                  glove, and always use the two-spoon method when tasting food.
                </span>
              </li>
            </ul>
          </section>

          {/* Subtopic 2.3 */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-kkm-amber px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                2.3
              </span>
              <Thermometer className="h-4 w-4 text-kkm-amber" />
              <h3 className="font-bold text-slate-900">
                Food Storage, Cold-Chain &amp; FIFO Rules
              </h3>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-2">
                <div className="font-semibold text-kkm-blue">Chiller</div>
                <div className="font-mono-tech text-sm font-bold text-slate-900">
                  0°C – 4°C
                </div>
              </div>
              <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-2">
                <div className="font-semibold text-cyan-900">Freezer</div>
                <div className="font-mono-tech text-sm font-bold text-slate-900">
                  ≤ -18°C
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2">
                <div className="font-semibold text-kkm-amber">Dry Store</div>
                <div className="font-mono-tech text-sm font-bold text-slate-900">
                  10°C – 21°C
                </div>
              </div>
            </div>

            <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-kkm-red-soft p-2.5 text-xs text-kkm-red">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong>Temperature Danger Zone (5°C – 60°C):</strong> Harmful
                bacteria multiply rapidly within this temperature range!
              </span>
            </div>

            <ul className="space-y-1.5 text-xs leading-relaxed">
              <li>
                • <strong>Chiller Shelf Order:</strong> Ready-to-eat / cooked food on{' '}
                <strong>Top Shelf</strong>; sealed raw meat/poultry on{' '}
                <strong>Bottom Shelf</strong> to prevent dripping juices.
              </li>
              <li>
                • <strong>FIFO Rule (First In, First Out):</strong> Always rotate
                older stock to the front so it is used before newer deliveries.
              </li>
              <li>
                • <strong>Dry Store Rules:</strong> Keep all goods at least{' '}
                <strong>15 cm off the floor</strong> and away from walls. Reject
                dented, rusted, or bulging cans (<em>Clostridium botulinum</em> risk).
              </li>
            </ul>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-200 bg-slate-50 px-5 py-3">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="w-full rounded-xl bg-kkm-blue px-4 py-2.5 text-sm font-bold text-white transition hover:bg-kkm-blue-dark"
          >
            Got It — Return to Inspection
          </button>
        </div>
      </div>
    </div>
  );
}
