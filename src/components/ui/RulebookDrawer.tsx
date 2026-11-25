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
      aria-label="Buku Panduan Sanitasi KKM"
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
                Buku Panduan Sanitasi KKM
              </h2>
              <p className="text-xs text-blue-100">
                Rujukan Pantas KSSM SRT Tingkatan 5 • Bab 2
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-lg p-2 text-blue-100 transition hover:bg-white/15 hover:text-white"
            aria-label="Tutup buku panduan"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 space-y-5 overflow-y-auto p-5 text-sm text-slate-700">
          <div className="rounded-xl border border-kkm-teal/25 bg-kkm-teal-soft p-3.5 text-xs text-kkm-teal">
            <strong>Tip Inspektor:</strong> Pemasa misi dijeda secara automatik
            semasa anda merujuk Buku Panduan ini. Gunakan rujukan ini untuk membuat
            keputusan audit yang tepat!
          </div>

          {/* Subtopik 2.1 */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-kkm-blue px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                2.1
              </span>
              <UtensilsCrossed className="h-4 w-4 text-kkm-blue" />
              <h3 className="font-bold text-slate-900">
                Amalan Kebersihan di Dapur (4 Zon Sanitasi)
              </h3>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Stesen Cuci:</strong> Perangkap gris (<em>grease trap</em>)
                  wajib dibersihkan berkala. Singki cuci tangan mesti berasingan
                  daripada singki bahan mentah dan dilengkapi sabun cecair serta tisu
                  pakai buang.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Stesen Potong / Penyediaan:</strong> Asingkan makanan mentah
                  dan makanan siap dimakan (elak pencemaran silang). Gunakan papan
                  pemotong berkod warna; buang papan kayu yang retak atau berkulat.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Stesen Memasak:</strong> Hud penyedut asap bebas minyak
                  menitis. Peralatan bersih dikeringkan udara (<em>air-dried</em>) dan
                  disimpan terbalik ≥15 cm dari lantai.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-teal" />
                <span>
                  <strong>Stesen Sisa:</strong> Tong sampah mesti bertutup rapat,
                  berpedal kaki, dilapik beg plastik, dan dikosongkan sebelum melimpah.
                </span>
              </li>
            </ul>
          </section>

          {/* Subtopik 2.2 */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-kkm-teal px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                2.2
              </span>
              <UserCheck className="h-4 w-4 text-kkm-teal" />
              <h3 className="font-bold text-slate-900">
                Etika &amp; Pakaian Pengendali Makanan
              </h3>
            </div>
            <ul className="space-y-2 text-xs leading-relaxed">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-green" />
                <span>
                  <strong>Peraturan 30 &amp; 31 (PPKM 2009):</strong> Wajib menghadiri
                  kursus SLPM dan mempunyai <strong>Suntikan Tifoid</strong> yang sah
                  (diperbaharui setiap 3 tahun).
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-green" />
                <span>
                  <strong>Peraturan 32 (Pakaian):</strong> Apron bersih berwarna cerah,
                  penutup kepala (<em>hairnet</em>), dan <strong>kasut bertutup</strong>{' '}
                  kalis gelincir (dilarang memakai selipar terbuka).
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-kkm-green" />
                <span>
                  <strong>Peraturan 33 (Kebersihan Diri):</strong> Kuku pendek tanpa
                  pewarna, <strong>tiada barang kemas</strong> (cincin/gelang/jam),
                  luka kecil wajib dibalut <strong>plaster kalis air</strong> + sarung
                  tangan bersih, dan guna kaedah 2 sudu semasa merasa makanan.
                </span>
              </li>
            </ul>
          </section>

          {/* Subtopik 2.3 */}
          <section className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div className="mb-2.5 flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-kkm-amber px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
                2.3
              </span>
              <Thermometer className="h-4 w-4 text-kkm-amber" />
              <h3 className="font-bold text-slate-900">
                Penyimpanan Makanan, Suhu &amp; FIFO
              </h3>
            </div>

            <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg border border-blue-200 bg-blue-50 p-2">
                <div className="font-semibold text-kkm-blue">Peti Sejuk</div>
                <div className="font-mono-tech text-sm font-bold text-slate-900">
                  0°C – 4°C
                </div>
              </div>
              <div className="rounded-lg border border-cyan-200 bg-cyan-50 p-2">
                <div className="font-semibold text-cyan-900">Sejuk Beku</div>
                <div className="font-mono-tech text-sm font-bold text-slate-900">
                  ≤ -18°C
                </div>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-2">
                <div className="font-semibold text-kkm-amber">Stor Kering</div>
                <div className="font-mono-tech text-sm font-bold text-slate-900">
                  10°C – 21°C
                </div>
              </div>
            </div>

            <div className="mb-3 flex items-start gap-2 rounded-lg border border-red-200 bg-kkm-red-soft p-2.5 text-xs text-kkm-red">
              <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0" />
              <span>
                <strong>Zon Suhu Bahaya (5°C – 60°C):</strong> Bakteria membiak
                dengan sangat pantas dalam julat suhu ini!
              </span>
            </div>

            <ul className="space-y-1.5 text-xs leading-relaxed">
              <li>
                • <strong>Susunan Peti Sejuk:</strong> Makanan siap dimakan / masak di{' '}
                <strong>Rak Atas</strong>; daging/ayam mentah bertutup rapat di{' '}
                <strong>Rak Bawah</strong> (elak titisan darah).
              </li>
              <li>
                • <strong>Peraturan FIFO (First In, First Out):</strong> Stok lama
                mesti diletakkan di hadapan untuk digunakan dahulu sebelum stok baharu.
              </li>
              <li>
                • <strong>Stor Kering:</strong> Simpan makanan sekurang-kurangnya{' '}
                <strong>15 cm dari lantai</strong> &amp; dinding. Tolak tin kemek,
                berkarat atau menggelembung (risiko <em>Clostridium botulinum</em>).
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
            Faham &amp; Kembali ke Pemeriksaan
          </button>
        </div>
      </div>
    </div>
  );
}
