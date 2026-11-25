import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileText,
  ShieldAlert,
  ShieldCheck,
  XCircle,
} from 'lucide-react';
import { level1Staff } from '../../data/syllabusContent';
import { useGameStore } from '../../store/useGameStore';
import type { StaffProfile } from '../../types/game';
import { formatRelativeMalayDate, getInspectionDateLabel } from '../../utils/dates';
import {
  playClickSound,
  playCorrectSound,
  playStampSound,
  playWrongSound,
} from '../../utils/sound';

function StaffCharacterSVG({ staff }: { staff: StaffProfile }) {
  const { avatar, apron, apronClean, hairnet, jewelry, gloveStatus, footwear, hasOpenWound, cutsCovered } =
    staff;

  const leftHandFill =
    gloveStatus === 'clean'
      ? '#38bdf8'
      : gloveStatus === 'dirty'
        ? '#a16207'
        : avatar.skinTone;

  return (
    <svg
      viewBox="0 0 260 320"
      className="mx-auto h-64 w-56 select-none sm:h-72 sm:w-60"
      role="img"
      aria-label={`Ilustrasi pengendali makanan ${staff.name}`}
    >
      {/* Clinical backdrop circle */}
      <rect x="10" y="10" width="240" height="300" rx="18" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
      <line x1="28" y1="284" x2="232" y2="284" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />

      {/* Legs / Trousers */}
      <rect x="96" y="210" width="26" height="58" rx="6" fill="#334155" />
      <rect x="138" y="210" width="26" height="58" rx="6" fill="#334155" />

      {/* Footwear */}
      {footwear === 'closed_shoes' ? (
        <g>
          <path d="M90 266 h34 a6 6 0 0 1 6 6 v10 h-44 v-8 a8 8 0 0 1 4 -8 z" fill="#0f172a" />
          <path d="M136 266 h34 a8 8 0 0 1 4 8 v8 h-44 v-10 a6 6 0 0 1 6 -6 z" fill="#0f172a" />
          <rect x="86" y="279" width="44" height="4" rx="2" fill="#475569" />
          <rect x="130" y="279" width="44" height="4" rx="2" fill="#475569" />
        </g>
      ) : (
        /* Open Slippers — clear violation visual */
        <g>
          <ellipse cx="107" cy="274" rx="16" ry="7" fill={avatar.skinTone} />
          <ellipse cx="153" cy="274" rx="16" ry="7" fill={avatar.skinTone} />
          <rect x="86" y="278" width="42" height="6" rx="3" fill="#ef4444" />
          <rect x="132" y="278" width="42" height="6" rx="3" fill="#ef4444" />
          <path d="M96 278 Q107 265 118 278" fill="none" stroke="#b91c1c" strokeWidth="4" />
          <path d="M142 278 Q153 265 164 278" fill="none" stroke="#b91c1c" strokeWidth="4" />
        </g>
      )}

      {/* Torso / Chef Shirt */}
      <path d="M76 122 Q76 106 96 104 h68 q20 2 20 18 v94 h-108 z" fill={avatar.shirtColor} stroke="#cbd5e1" strokeWidth="2" />

      {/* Arms */}
      <path d="M76 124 L54 176 L72 184 L88 144" fill={avatar.shirtColor} stroke="#cbd5e1" strokeWidth="2" />
      <path d="M184 124 L206 176 L188 184 L172 144" fill={avatar.shirtColor} stroke="#cbd5e1" strokeWidth="2" />

      {/* Hands / Gloves */}
      <circle cx="62" cy="186" r="12" fill={leftHandFill} stroke="#94a3b8" strokeWidth="1.5" />
      <circle cx="198" cy="186" r="12" fill={leftHandFill} stroke="#94a3b8" strokeWidth="1.5" />

      {/* Dirty Glove Smudges */}
      {gloveStatus === 'dirty' && (
        <g opacity="0.85">
          <circle cx="59" cy="184" r="4" fill="#713f12" />
          <circle cx="201" cy="188" r="4.5" fill="#713f12" />
        </g>
      )}

      {/* Jewelry (Ring & Gold Bangle) */}
      {jewelry && (
        <g>
          <rect x="184" y="172" width="22" height="5" rx="2.5" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
          <circle cx="203" cy="192" r="4" fill="#fbbf24" stroke="#b45309" strokeWidth="1.2" />
          <circle cx="203" cy="192" r="1.6" fill="#fef08a" />
        </g>
      )}

      {/* Wound indicator on right hand */}
      {hasOpenWound && !cutsCovered && (
        <g>
          <line x1="193" y1="183" x2="204" y2="190" stroke="#dc2626" strokeWidth="3.2" strokeLinecap="round" />
          <circle cx="204" cy="191" r="2.2" fill="#ef4444" />
        </g>
      )}
      {hasOpenWound && cutsCovered && (
        <g>
          <rect
            x="190"
            y="181"
            width="16"
            height="8"
            rx="3"
            transform="rotate(-15 198 185)"
            fill="#2563eb"
            stroke="#1d4ed8"
            strokeWidth="1"
          />
          <rect
            x="195"
            y="183"
            width="6"
            height="4"
            rx="1"
            transform="rotate(-15 198 185)"
            fill="#93c5fd"
          />
        </g>
      )}

      {/* Apron */}
      {apron && (
        <g>
          <path d="M104 105 v18 m52 -18 v18" stroke="#0f766e" strokeWidth="4" />
          <rect
            x="92"
            y="122"
            width="76"
            height="104"
            rx="8"
            fill={apronClean ? '#ffffff' : '#fef3c7'}
            stroke="#0f766e"
            strokeWidth="2.2"
          />
          <rect x="108" y="162" width="44" height="24" rx="4" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          {/* Dirty stains on apron */}
          {!apronClean && (
            <g opacity="0.75">
              <ellipse cx="114" cy="144" rx="9" ry="6" fill="#92400e" />
              <ellipse cx="146" cy="196" rx="11" ry="7" fill="#78350f" />
              <circle cx="136" cy="152" r="4" fill="#b45309" />
            </g>
          )}
        </g>
      )}

      {/* Neck */}
      <rect x="118" y="88" width="24" height="20" rx="6" fill={avatar.skinTone} />

      {/* Hijab if applicable */}
      {avatar.hijab && (
        <path
          d="M90 66 Q90 26 130 26 Q170 26 170 66 L176 116 Q130 128 84 116 Z"
          fill="#0f766e"
          stroke="#115e59"
          strokeWidth="2"
        />
      )}

      {/* Head */}
      <circle cx="130" cy="64" r="28" fill={avatar.skinTone} stroke="#d6a57c" strokeWidth="1.2" />

      {/* Hair (if no hijab) */}
      {!avatar.hijab && (
        <path
          d={
            hairnet
              ? 'M103 58 Q106 36 130 36 Q154 36 157 58 Q144 48 130 48 Q116 48 103 58 Z'
              : 'M100 66 Q96 30 130 28 Q166 30 162 68 Q168 82 156 90 Q152 60 144 50 Q130 46 116 50 Q108 60 104 90 Q94 82 100 66 Z'
          }
          fill={avatar.hairColor}
        />
      )}

      {/* Hairnet / Chef Cap */}
      {hairnet && (
        <g>
          <path
            d="M98 52 Q98 20 130 20 Q162 20 162 52 Z"
            fill="#e0f2fe"
            fillOpacity="0.92"
            stroke="#0284c7"
            strokeWidth="2"
          />
          <line x1="102" y1="48" x2="158" y2="48" stroke="#0284c7" strokeWidth="2.5" />
          <path d="M114 24 Q130 34 146 24" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="3 3" />
          <path d="M105 36 Q130 44 155 36" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeDasharray="3 3" />
        </g>
      )}

      {/* Face features */}
      <circle cx="120" cy="64" r="2.6" fill="#1e293b" />
      <circle cx="140" cy="64" r="2.6" fill="#1e293b" />
      <path d="M122 76 Q130 82 138 76" fill="none" stroke="#7c2d12" strokeWidth="2" strokeLinecap="round" />

      {/* Quick labels under feet */}
      <text x="130" y="301" textAnchor="middle" fill="#64748b" fontSize="10" fontWeight="600">
        {footwear === 'closed_shoes' ? 'Kasut Bertutup' : 'Selipar Terbuka'}
      </text>
    </svg>
  );
}

interface FeedbackState {
  isCorrect: boolean;
  pointsAwarded: number;
  decisionLabel: string;
  explanation: string;
  kssmReference: string;
  correctLabel: string;
}

export function Level1StaffCheck() {
  const answers = useGameStore((s) => s.answers);
  const processAnswer = useGameStore((s) => s.processAnswer);
  const completeCurrentLevel = useGameStore((s) => s.completeCurrentLevel);
  const setTimerActive = useGameStore((s) => s.setTimerActive);
  const gameMode = useGameStore((s) => s.gameMode);

  const firstUnresolved = level1Staff.findIndex((st) => !answers[st.id]);
  const [currentIndex, setCurrentIndex] = useState(
    firstUnresolved >= 0 ? firstUnresolved : 0
  );
  const [showRejectPicker, setShowRejectPicker] = useState(false);
  const [showHealthCardModal, setShowHealthCardModal] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackState | null>(null);
  const [lastStamp, setLastStamp] = useState<'LULUS' | 'TOLAK' | null>(null);

  const staff = level1Staff[currentIndex];
  const existingAnswer = answers[staff.id];
  const resolvedCount = level1Staff.filter((s) => Boolean(answers[s.id])).length;
  const allResolved = resolvedCount === level1Staff.length;

  // Pause timer while feedback modal is visible
  useEffect(() => {
    if (gameMode === 'practice') return;
    setTimerActive(feedback === null);
    return () => setTimerActive(true);
  }, [feedback, gameMode, setTimerActive]);

  const handlePassDecision = () => {
    if (existingAnswer) return;
    playStampSound();
    setLastStamp('LULUS');

    const isCorrect = staff.correctDecision === 'pass';
    const correctChoice =
      staff.correctDecision === 'pass'
        ? 'LULUS MASUK DAPUR (Mematuhi piawaian)'
        : `TOLAK — ${staff.violationOptions[staff.correctViolationIndex]}`;

    const points = processAnswer({
      itemId: staff.id,
      level: 1,
      subtopic: staff.subtopic,
      isCorrect,
      itemTitle: `${staff.name} (${staff.staffCode})`,
      userChoice: 'LULUS MASUK DAPUR',
      correctChoice,
      explanation: staff.explanation,
      kssmReference: staff.kssmReference,
    });

    if (isCorrect) playCorrectSound();
    else playWrongSound();

    setFeedback({
      isCorrect,
      pointsAwarded: points,
      decisionLabel: 'LULUS MASUK DAPUR',
      correctLabel: correctChoice,
      explanation: staff.explanation,
      kssmReference: staff.kssmReference,
    });
  };

  const handleConfirmReject = (reasonIndex: number) => {
    if (existingAnswer) return;
    playStampSound();
    setLastStamp('TOLAK');
    setShowRejectPicker(false);

    const chosenReason = staff.violationOptions[reasonIndex];
    const isCorrect =
      staff.correctDecision === 'reject' &&
      reasonIndex === staff.correctViolationIndex;

    const correctChoice =
      staff.correctDecision === 'pass'
        ? 'LULUS MASUK DAPUR (Tiada pelanggaran)'
        : `TOLAK — ${staff.violationOptions[staff.correctViolationIndex]}`;

    const points = processAnswer({
      itemId: staff.id,
      level: 1,
      subtopic: staff.subtopic,
      isCorrect,
      itemTitle: `${staff.name} (${staff.staffCode})`,
      userChoice: `TOLAK — ${chosenReason}`,
      correctChoice,
      explanation: staff.explanation,
      kssmReference: staff.kssmReference,
    });

    if (isCorrect) playCorrectSound();
    else playWrongSound();

    setFeedback({
      isCorrect,
      pointsAwarded: points,
      decisionLabel: `TOLAK (${chosenReason})`,
      correctLabel: correctChoice,
      explanation: staff.explanation,
      kssmReference: staff.kssmReference,
    });
  };

  const handleCloseFeedback = () => {
    playClickSound();
    setFeedback(null);
    setLastStamp(null);

    const updatedAnswers = useGameStore.getState().answers;
    const nextUnresolved = level1Staff.findIndex((st) => !updatedAnswers[st.id]);
    if (nextUnresolved === -1) {
      completeCurrentLevel(1, level1Staff.length);
    } else {
      setCurrentIndex(nextUnresolved);
    }
  };

  const selectIndex = (idx: number) => {
    playClickSound();
    setShowRejectPicker(false);
    setLastStamp(null);
    setCurrentIndex(idx);
  };

  const typhoidDateLabel = formatRelativeMalayDate(staff.typhoidExpiryOffsetDays);

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-5">
      {/* Level Header & Queue Bar */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-kkm-blue px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
              SUBTOPIK 2.2
            </span>
            <span className="text-xs font-semibold text-kkm-teal">
              Pos Pemeriksaan Sif Pagi
            </span>
          </div>
          <h1 className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
            Semakan Kebersihan Diri &amp; Pakaian Pengendali Makanan
          </h1>
          <p className="text-xs text-slate-600">
            Periksa ilustrasi pakaian, tangan, kasut, dan{' '}
            <strong>Kad Pengendali Makanan</strong> sebelum memberi cop kelulusan.
          </p>
        </div>

        {/* Queue Pills */}
        <div className="flex flex-col items-end gap-1.5">
          <div className="font-mono-tech text-xs font-bold text-slate-600">
            Staf Disemak: {resolvedCount} / {level1Staff.length}
          </div>
          <div className="flex items-center gap-1.5">
            {level1Staff.map((item, idx) => {
              const ans = answers[item.id];
              const isCurrent = idx === currentIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => selectIndex(idx)}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg font-mono-tech text-xs font-bold transition ${
                    isCurrent
                      ? 'ring-2 ring-kkm-blue ring-offset-1 '
                      : ''
                  }${
                    ans
                      ? ans.isCorrect
                        ? 'bg-kkm-green text-white'
                        : 'bg-kkm-red text-white'
                      : isCurrent
                        ? 'bg-kkm-blue text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                  title={item.name}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Inspection Desk */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Left: Character Visual + Stamp Overlay */}
        <div className="relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:col-span-5">
          <div className="mb-3 flex items-center justify-between">
            <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono-tech text-xs font-bold text-slate-700">
              STAF #{currentIndex + 1} • {staff.staffCode}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={currentIndex === 0}
                onClick={() => selectIndex(currentIndex - 1)}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-35"
                aria-label="Staf sebelumnya"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                disabled={currentIndex === level1Staff.length - 1}
                onClick={() => selectIndex(currentIndex + 1)}
                className="rounded-lg border border-slate-200 p-1.5 text-slate-600 hover:bg-slate-50 disabled:opacity-35"
                aria-label="Staf seterusnya"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="relative flex items-center justify-center py-2">
            <StaffCharacterSVG staff={staff} />

            {/* Stamp overlay */}
            {(lastStamp || existingAnswer) && (
              <div
                className={`pointer-events-none absolute inset-0 flex items-center justify-center`}
              >
                <div
                  className={`animate-stamp-slam rounded-xl border-4 px-5 py-2 font-mono-tech text-2xl font-black tracking-widest shadow-lg ${
                    (lastStamp ??
                      (existingAnswer?.userChoice.startsWith('LULUS')
                        ? 'LULUS'
                        : 'TOLAK')) === 'LULUS'
                      ? 'border-kkm-green bg-white/90 text-kkm-green'
                      : 'border-kkm-red bg-white/90 text-kkm-red'
                  }`}
                >
                  {lastStamp ??
                    (existingAnswer?.userChoice.startsWith('LULUS')
                      ? 'LULUS'
                      : 'TOLAK')}
                </div>
              </div>
            )}
          </div>

          {/* Physical Observation Checklist */}
          <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Penutup Kepala
              </span>
              <div className="font-semibold text-slate-800">
                {staff.hairnet ? 'Dipakai kemas' : 'Tiada penutup kepala'}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Apron
              </span>
              <div className="font-semibold text-slate-800">
                {!staff.apron
                  ? 'Tiada apron'
                  : staff.apronClean
                    ? 'Cerah & bersih'
                    : 'Kotor / berminyak'}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Barang Kemas
              </span>
              <div className="font-semibold text-slate-800">
                {staff.jewelryDetail}
              </div>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-2">
              <span className="text-[10px] font-bold uppercase text-slate-400">
                Sarung Tangan
              </span>
              <div className="font-semibold text-slate-800">
                {staff.gloveStatus === 'clean'
                  ? 'Pakai buang (Bersih)'
                  : staff.gloveStatus === 'dirty'
                    ? 'Kotor / Tidak ditukar'
                    : 'Tiada (Tangan kosong)'}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Kad Pengendali Makanan & Stamp Controls */}
        <div className="flex flex-col justify-between gap-4 lg:col-span-7">
          {/* Laminated KKM Food Handler Card */}
          <div className="overflow-hidden rounded-2xl border-2 border-kkm-teal/30 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-gradient-to-r from-kkm-blue to-kkm-teal px-5 py-3 text-white">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5 text-teal-200" />
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-blue-100">
                    Kad Pengendali Makanan (Simulasi KKM)
                  </div>
                  <div className="text-sm font-extrabold">{staff.name}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  playClickSound();
                  setShowHealthCardModal((v) => !v);
                }}
                className="inline-flex items-center gap-1 rounded-lg bg-white/15 px-2.5 py-1.5 text-xs font-bold text-white transition hover:bg-white/25"
              >
                <FileText className="h-3.5 w-3.5" />
                {showHealthCardModal ? 'Ringkasan' : 'Nota Kesihatan'}
              </button>
            </div>

            <div className="space-y-4 p-5">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <div className="text-[11px] font-bold uppercase text-slate-500">
                    Jawatan &amp; ID Staf
                  </div>
                  <div className="mt-0.5 text-sm font-bold text-slate-900">
                    {staff.role}
                  </div>
                  <div className="font-mono-tech text-xs text-slate-500">
                    No. Pendaftaran: {staff.staffCode}
                  </div>
                </div>

                <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-3">
                  <div className="text-[11px] font-bold uppercase text-kkm-blue">
                    Suntikan Tifoid (Peraturan 31)
                  </div>
                  <div className="mt-0.5 font-mono-tech text-sm font-extrabold text-slate-900">
                    Sah Sehingga: {typhoidDateLabel}
                  </div>
                  <div className="text-[11px] text-slate-600">
                    Bandingkan dengan Tarikh Audit:{' '}
                    <span className="font-mono-tech font-semibold">
                      {getInspectionDateLabel()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="text-[11px] font-bold uppercase text-slate-500">
                    Sijil Latihan Pengendali (SLPM)
                  </div>
                  <div className="mt-0.5 text-xs font-bold text-slate-800">
                    {staff.slpmCertValid
                      ? 'Sah — Telah menghadiri kursus SLPM'
                      : 'Tiada rekod kursus SLPM'}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-3">
                  <div className="text-[11px] font-bold uppercase text-slate-500">
                    Pemeriksaan Luka &amp; Kulit
                  </div>
                  <div className="mt-0.5 text-xs font-bold text-slate-800">
                    {!staff.hasOpenWound
                      ? 'Tiada luka dikesan pada tangan'
                      : staff.cutsCovered
                        ? 'Luka kecil dibalut plaster kalis air + sarung tangan'
                        : 'Luka terbuka pada jari tanpa balutan plaster!'}
                  </div>
                </div>
              </div>

              {/* Health Notes Drawer / Box */}
              <div
                className={`rounded-xl border p-3.5 text-xs leading-relaxed transition ${
                  showHealthCardModal
                    ? 'border-kkm-teal bg-kkm-teal-soft text-slate-800'
                    : 'border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                <div className="mb-1 font-bold uppercase tracking-wide text-slate-500 text-[11px]">
                  Catatan Pemeriksaan Fizikal &amp; Kesihatan:
                </div>
                {staff.healthNotes}
              </div>
            </div>
          </div>

          {/* Decision Area */}
          {existingAnswer ? (
            <div
              className={`rounded-2xl border p-4 ${
                existingAnswer.isCorrect
                  ? 'border-green-200 bg-kkm-green-soft'
                  : 'border-red-200 bg-kkm-red-soft'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {existingAnswer.isCorrect ? (
                    <CheckCircle2 className="h-5 w-5 text-kkm-green" />
                  ) : (
                    <XCircle className="h-5 w-5 text-kkm-red" />
                  )}
                  <span
                    className={
                      existingAnswer.isCorrect ? 'text-kkm-green' : 'text-kkm-red'
                    }
                  >
                    {existingAnswer.isCorrect
                      ? 'Keputusan Tepat'
                      : 'Keputusan Kurang Tepat'}
                  </span>
                </div>
                <span className="font-mono-tech text-xs font-bold text-slate-700">
                  {existingAnswer.pointsAwarded >= 0
                    ? `+${existingAnswer.pointsAwarded}`
                    : existingAnswer.pointsAwarded}{' '}
                  mata
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                {staff.explanation}
              </p>
              <p className="mt-1.5 font-mono-tech text-[11px] font-semibold text-kkm-blue">
                {staff.kssmReference}
              </p>
              {allResolved && (
                <button
                  type="button"
                  onClick={() => completeCurrentLevel(1, level1Staff.length)}
                  className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-kkm-blue px-4 py-2.5 text-xs font-bold text-white hover:bg-kkm-blue-dark"
                >
                  Selesai Tahap 1 &amp; Lihat Rumusan
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          ) : !showRejectPicker ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
                Cop Keputusan Inspektor:
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handlePassDecision}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-kkm-green bg-kkm-green px-4 py-4 text-sm font-extrabold tracking-wide text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
                >
                  <ShieldCheck className="h-5 w-5" />
                  LULUS MASUK DAPUR
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setShowRejectPicker(true);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border-2 border-kkm-red bg-kkm-red px-4 py-4 text-sm font-extrabold tracking-wide text-white shadow-sm transition hover:bg-red-800 active:scale-[0.98]"
                >
                  <ShieldAlert className="h-5 w-5" />
                  TOLAK / KUARANTIN
                </button>
              </div>
            </div>
          ) : (
            /* Violation Reason Picker */
            <div className="rounded-2xl border-2 border-kkm-red/40 bg-red-50/50 p-5 shadow-sm animate-fade-in-up">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm font-extrabold text-kkm-red">
                  <AlertTriangle className="h-4 w-4" />
                  Pilih Sebab Pelanggaran Utama:
                </div>
                <button
                  type="button"
                  onClick={() => {
                    playClickSound();
                    setShowRejectPicker(false);
                  }}
                  className="text-xs font-bold text-slate-500 underline hover:text-slate-800"
                >
                  Batal / Semak Semula
                </button>
              </div>
              <div className="space-y-2">
                {staff.violationOptions.map((opt, idx) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => handleConfirmReject(idx)}
                    className="flex w-full items-center gap-3 rounded-xl border border-red-200 bg-white px-4 py-3 text-left text-xs font-semibold text-slate-800 transition hover:border-kkm-red hover:bg-kkm-red hover:text-white"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-red-100 font-mono-tech text-xs font-bold text-kkm-red">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Instant Validation Feedback Modal */}
      {feedback && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/55 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in-up">
            <div
              className={`flex items-center justify-between px-6 py-4 text-white ${
                feedback.isCorrect ? 'bg-kkm-green' : 'bg-kkm-red'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {feedback.isCorrect ? (
                  <CheckCircle2 className="h-6 w-6" />
                ) : (
                  <XCircle className="h-6 w-6" />
                )}
                <div>
                  <h3 className="text-base font-extrabold">
                    {feedback.isCorrect
                      ? 'Keputusan Tepat!'
                      : 'Semakan Tidak Tepat'}
                  </h3>
                  <p className="text-xs opacity-90">
                    Pilihan anda: {feedback.decisionLabel}
                  </p>
                </div>
              </div>
              <span className="rounded-lg bg-white/20 px-2.5 py-1 font-mono-tech text-sm font-extrabold">
                {feedback.pointsAwarded >= 0
                  ? `+${feedback.pointsAwarded}`
                  : feedback.pointsAwarded}{' '}
                mata
              </span>
            </div>

            <div className="space-y-4 p-6">
              {!feedback.isCorrect && (
                <div className="rounded-xl border border-amber-200 bg-kkm-amber-soft p-3 text-xs text-slate-800">
                  <strong className="text-kkm-amber">Jawapan Sebenar:</strong>{' '}
                  {feedback.correctLabel}
                </div>
              )}

              <div>
                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Penjelasan Buku Teks KSSM
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {feedback.explanation}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 px-3.5 py-2.5 font-mono-tech text-[11px] font-semibold text-kkm-blue">
                Rujukan: {feedback.kssmReference}
              </div>

              <button
                type="button"
                onClick={handleCloseFeedback}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-kkm-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-kkm-blue-dark"
              >
                {resolvedCount >= level1Staff.length
                  ? 'Lihat Rumusan Tahap 1'
                  : 'Teruskan ke Staf Seterusnya'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
