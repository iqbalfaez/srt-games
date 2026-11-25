import { ArrowRight, Award, CheckCircle2, Clock } from 'lucide-react';
import { useGameStore } from '../../store/useGameStore';
import { playClickSound } from '../../utils/sound';

const LEVEL_NAMES: Record<1 | 2 | 3, { title: string; nextCta: string }> = {
  1: {
    title: 'Tahap 1 Selesai: Semakan Pengendali Makanan',
    nextCta: 'Teruskan ke Tahap 2: Audit Dapur Komersial',
  },
  2: {
    title: 'Tahap 2 Selesai: Audit Visual Dapur Komersial',
    nextCta: 'Teruskan ke Tahap 3: Audit Rantaian Sejuk & Stor',
  },
  3: {
    title: 'Tahap 3 Selesai: Audit Penyimpanan Makanan',
    nextCta: 'Jana Laporan Audit & Sijil Inspektor Muda',
  },
};

export function LevelRecapModal() {
  const recap = useGameStore((s) => s.pendingLevelRecap);
  const proceedFromLevelRecap = useGameStore((s) => s.proceedFromLevelRecap);

  if (!recap) return null;

  const pct = Math.round((recap.correctCount / recap.totalCount) * 100);
  const meta = LEVEL_NAMES[recap.level];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm no-print">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in-up">
        <div className="bg-gradient-to-r from-kkm-blue to-kkm-teal px-6 py-5 text-white">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            <Award className="h-3.5 w-3.5" />
            Rumusan Tahap {recap.level} daripada 3
          </div>
          <h2 className="text-lg font-extrabold leading-snug">{meta.title}</h2>
        </div>

        <div className="space-y-4 p-6">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs font-semibold text-slate-500">
                <CheckCircle2 className="h-4 w-4 text-kkm-green" />
                Ketepatan
              </div>
              <div className="font-mono-tech text-2xl font-extrabold text-slate-900">
                {recap.correctCount}/{recap.totalCount}
              </div>
              <div className="text-xs font-semibold text-kkm-teal">{pct}% Tepat</div>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 text-center">
              <div className="mb-1 flex items-center justify-center gap-1 text-xs font-semibold text-slate-500">
                <Clock className="h-4 w-4 text-kkm-amber" />
                Bonus Masa
              </div>
              <div className="font-mono-tech text-2xl font-extrabold text-kkm-amber">
                +{recap.timeBonus}
              </div>
              <div className="text-xs text-slate-500">Markah Inspektor</div>
            </div>
          </div>

          <p className="rounded-xl bg-blue-50/70 p-3 text-xs leading-relaxed text-slate-700">
            {pct >= 80
              ? 'Prestasi cemerlang! Pemeriksaan anda menepati garis panduan KSSM SRT Tingkatan 5 Bab 2.'
              : 'Usaha yang baik! Jangan lupa semak Senarai Semak Ulang Kaji pada laporan akhir nanti untuk memperbaiki kesilapan.'}
          </p>

          <button
            type="button"
            onClick={() => {
              playClickSound();
              proceedFromLevelRecap();
            }}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-kkm-blue px-5 py-3.5 text-sm font-bold text-white shadow-md transition hover:bg-kkm-blue-dark active:scale-[0.99]"
          >
            {meta.nextCta}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
