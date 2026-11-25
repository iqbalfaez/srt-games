import { useEffect, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  CheckCircle2,
  Layers,
  PackageCheck,
  PackageX,
  ShieldAlert,
  ShieldCheck,
  Snowflake,
  Thermometer,
  Warehouse,
  XCircle,
} from 'lucide-react';
import {
  level3Compartments,
  level3StorageItems,
} from '../../data/syllabusContent';
import { useGameStore } from '../../store/useGameStore';
import type {
  PlacementShelf,
  StorageCompartmentId,
  StorageItem,
} from '../../types/game';
import { formatRelativeMalayDate, getInspectionDateLabel } from '../../utils/dates';
import {
  playClickSound,
  playCorrectSound,
  playStampSound,
  playWrongSound,
} from '../../utils/sound';

const SHELF_LABELS: Record<PlacementShelf, string> = {
  top: 'Rak Atas',
  middle: 'Rak Tengah',
  bottom: 'Rak Bawah',
  floor: 'Terus di Atas Lantai (0 cm)',
};

const COMPARTMENT_ICONS: Record<StorageCompartmentId, typeof Thermometer> = {
  chiller: Thermometer,
  freezer: Snowflake,
  dry_store: Warehouse,
};

interface StorageFeedback {
  item: StorageItem;
  isCorrect: boolean;
  pointsAwarded: number;
  userChoice: string;
  correctChoice: string;
}

export function Level3StorageAudit() {
  const answers = useGameStore((s) => s.answers);
  const processAnswer = useGameStore((s) => s.processAnswer);
  const completeCurrentLevel = useGameStore((s) => s.completeCurrentLevel);
  const setTimerActive = useGameStore((s) => s.setTimerActive);
  const gameMode = useGameStore((s) => s.gameMode);

  const [activeTab, setActiveTab] = useState<StorageCompartmentId>('chiller');
  const [seizeTargetId, setSeizeTargetId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<StorageFeedback | null>(null);

  const resolvedCount = level3StorageItems.filter((item) =>
    Boolean(answers[item.id])
  ).length;
  const allResolved = resolvedCount === level3StorageItems.length;

  const activeEnv = level3Compartments.find((c) => c.id === activeTab)!;
  const compartmentItems = level3StorageItems.filter(
    (item) => item.compartment === activeTab
  );

  // Pause timer while feedback modal is open
  useEffect(() => {
    if (gameMode === 'practice') return;
    setTimerActive(feedback === null);
    return () => setTimerActive(true);
  }, [feedback, gameMode, setTimerActive]);

  const handleSafeDecision = (item: StorageItem) => {
    if (answers[item.id]) return;
    playStampSound();

    const isCorrect = item.isSafe;
    const correctChoice = item.isSafe
      ? 'SELAMAT DISIMPAN'
      : `SITA / ROSAK — ${item.violationOptions[item.correctViolationIndex]}`;

    const points = processAnswer({
      itemId: item.id,
      level: 3,
      subtopic: item.subtopic,
      isCorrect,
      itemTitle: item.name,
      userChoice: 'SELAMAT DISIMPAN',
      correctChoice,
      explanation: item.defectReason,
      kssmReference: item.kssmReference,
    });

    if (isCorrect) playCorrectSound();
    else playWrongSound();

    setFeedback({
      item,
      isCorrect,
      pointsAwarded: points,
      userChoice: 'SELAMAT DISIMPAN',
      correctChoice,
    });
  };

  const handleConfirmSeize = (item: StorageItem, reasonIndex: number) => {
    if (answers[item.id]) return;
    playStampSound();
    setSeizeTargetId(null);

    const reasonText = item.violationOptions[reasonIndex];
    const isCorrect = !item.isSafe && reasonIndex === item.correctViolationIndex;
    const correctChoice = item.isSafe
      ? 'SELAMAT DISIMPAN (Mematuhi piawaian)'
      : `SITA / ROSAK — ${item.violationOptions[item.correctViolationIndex]}`;

    const points = processAnswer({
      itemId: item.id,
      level: 3,
      subtopic: item.subtopic,
      isCorrect,
      itemTitle: item.name,
      userChoice: `SITA / ROSAK — ${reasonText}`,
      correctChoice,
      explanation: item.defectReason,
      kssmReference: item.kssmReference,
    });

    if (isCorrect) playCorrectSound();
    else playWrongSound();

    setFeedback({
      item,
      isCorrect,
      pointsAwarded: points,
      userChoice: `SITA / ROSAK (${reasonText})`,
      correctChoice,
    });
  };

  const handleCloseFeedback = () => {
    playClickSound();
    setFeedback(null);

    const updatedAnswers = useGameStore.getState().answers;
    const finished = level3StorageItems.every((i) => Boolean(updatedAnswers[i.id]));
    if (finished) {
      completeCurrentLevel(3, level3StorageItems.length);
      return;
    }

    // Auto-switch tab if all items in current compartment are now resolved
    const currentDone = compartmentItems.every((i) => Boolean(updatedAnswers[i.id]));
    if (currentDone) {
      const nextUnfinished = level3StorageItems.find(
        (i) => !updatedAnswers[i.id]
      );
      if (nextUnfinished) {
        setActiveTab(nextUnfinished.compartment);
      }
    }
  };

  const shelvesOrder: PlacementShelf[] =
    activeTab === 'dry_store'
      ? ['top', 'middle', 'bottom', 'floor']
      : ['top', 'middle', 'bottom'];

  return (
    <div className="mx-auto max-w-6xl px-3 py-5 sm:px-5">
      {/* Header Banner */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-kkm-amber px-2 py-0.5 font-mono-tech text-xs font-bold text-white">
              SUBTOPIK 2.3
            </span>
            <span className="text-xs font-semibold text-kkm-blue">
              Audit Rantaian Sejuk, Penyimpanan &amp; FIFO
            </span>
          </div>
          <h1 className="mt-1 text-lg font-extrabold text-slate-900 sm:text-xl">
            Pemeriksaan Peti Sejuk, Sejuk Beku &amp; Stor Kering
          </h1>
          <p className="text-xs text-slate-600">
            Semak suhu teras, susunan rak, keadaan pembungkusan, jarak lantai (≥15 cm),
            dan pematuhan <strong>FIFO</strong>. Zon Suhu Bahaya:{' '}
            <span className="font-mono-tech font-bold text-kkm-red">5°C – 60°C</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-xl border border-amber-200 bg-kkm-amber-soft px-4 py-2 text-right">
            <div className="text-[10px] font-bold uppercase tracking-wider text-kkm-amber">
              Item Diaudit
            </div>
            <div className="font-mono-tech text-base font-extrabold text-slate-900">
              {resolvedCount} / {level3StorageItems.length}
            </div>
          </div>
          {allResolved && (
            <button
              type="button"
              onClick={() =>
                completeCurrentLevel(3, level3StorageItems.length)
              }
              className="inline-flex items-center gap-1.5 rounded-xl bg-kkm-blue px-4 py-3 text-xs font-bold text-white hover:bg-kkm-blue-dark"
            >
              Rumusan
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Compartment Tabs */}
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        {level3Compartments.map((comp) => {
          const Icon = COMPARTMENT_ICONS[comp.id];
          const items = level3StorageItems.filter(
            (i) => i.compartment === comp.id
          );
          const done = items.filter((i) => Boolean(answers[i.id])).length;
          const isActive = activeTab === comp.id;

          return (
            <button
              key={comp.id}
              type="button"
              onClick={() => {
                playClickSound();
                setSeizeTargetId(null);
                setActiveTab(comp.id);
              }}
              className={`flex items-center justify-between rounded-2xl border-2 p-4 text-left transition ${
                isActive
                  ? 'border-kkm-blue bg-white shadow-md ring-2 ring-kkm-blue/15'
                  : 'border-slate-200 bg-white/80 hover:border-slate-300 hover:bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                    isActive
                      ? 'bg-kkm-blue text-white'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-sm font-extrabold text-slate-900">
                    {comp.name}
                  </div>
                  <div className="font-mono-tech text-xs text-slate-500">
                    Ideal: {comp.idealRangeLabel}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div
                  className={`inline-flex items-center rounded-lg px-2 py-0.5 font-mono-tech text-sm font-extrabold ${
                    comp.isAmbientCompliant
                      ? 'bg-kkm-teal-soft text-kkm-teal'
                      : 'bg-kkm-red-soft text-kkm-red'
                  }`}
                >
                  {comp.ambientTemp > 0
                    ? `+${comp.ambientTemp}°C`
                    : `${comp.ambientTemp}°C`}
                </div>
                <div className="mt-1 font-mono-tech text-[11px] font-semibold text-slate-500">
                  {done}/{items.length} selesai
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Content: Left = Visual Shelf Rack, Right = Item Inspection Cards */}
      <div className="grid gap-5 lg:grid-cols-12">
        {/* Visual Compartment Cutaway */}
        <div className="lg:col-span-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Termometer Digital Ruang
                </div>
                <div className="text-sm font-extrabold text-slate-900">
                  {activeEnv.name}
                </div>
              </div>
              <div className="rounded-xl bg-slate-900 px-3 py-1.5 font-mono-tech text-lg font-extrabold text-emerald-400 shadow-inner">
                {activeEnv.ambientTemp > 0
                  ? `+${activeEnv.ambientTemp}°C`
                  : `${activeEnv.ambientTemp}°C`}
              </div>
            </div>

            <p className="mb-4 rounded-lg bg-slate-50 p-2.5 text-xs text-slate-600">
              {activeEnv.ambientNote}
            </p>

            {/* Shelf Cutaway Diagram */}
            <div className="mb-2 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <Layers className="h-3.5 w-3.5 text-kkm-teal" />
              Susunan Rak Semasa
            </div>

            <div className="overflow-hidden rounded-xl border-2 border-slate-300 bg-slate-100">
              {shelvesOrder.map((shelf) => {
                const itemsOnShelf = compartmentItems.filter(
                  (i) => i.placementShelf === shelf
                );
                const isFloor = shelf === 'floor';

                return (
                  <div
                    key={shelf}
                    className={`border-b border-slate-300 p-3 last:border-b-0 ${
                      isFloor ? 'bg-amber-50/70' : 'bg-white'
                    }`}
                  >
                    <div className="mb-1.5 flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-slate-500">
                      <span>{SHELF_LABELS[shelf]}</span>
                      {activeTab === 'chiller' && shelf === 'top' && (
                        <span className="text-kkm-teal">Sepatutnya: Sedia Dimakan</span>
                      )}
                      {activeTab === 'chiller' && shelf === 'bottom' && (
                        <span className="text-kkm-blue">Sepatutnya: Bahan Mentah</span>
                      )}
                    </div>

                    {itemsOnShelf.length === 0 ? (
                      <div className="rounded-lg border border-dashed border-slate-200 py-2 text-center text-[11px] text-slate-400">
                        {activeTab === 'chiller' && shelf === 'bottom'
                          ? '(Ruang kosong — makanan masak berada di rak tengah)'
                          : '(Kosong)'}
                      </div>
                    ) : (
                      <div className="space-y-1.5">
                        {itemsOnShelf.map((item) => {
                          const ans = answers[item.id];
                          return (
                            <div
                              key={item.id}
                              className={`flex items-center justify-between rounded-lg border px-2.5 py-2 text-xs font-bold ${
                                ans
                                  ? ans.isCorrect
                                    ? 'border-green-300 bg-kkm-green-soft text-kkm-green'
                                    : 'border-red-300 bg-kkm-red-soft text-kkm-red'
                                  : 'border-blue-200 bg-blue-50/70 text-slate-800'
                              }`}
                            >
                              <span className="truncate pr-2">{item.name}</span>
                              <span className="shrink-0 font-mono-tech text-[11px]">
                                {item.currentTemp > 0
                                  ? `+${item.currentTemp}°C`
                                  : `${item.currentTemp}°C`}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mt-3 text-[11px] text-slate-500">
              Tarikh Audit Hari Ini:{' '}
              <span className="font-mono-tech font-bold text-slate-700">
                {getInspectionDateLabel()}
              </span>
            </div>
          </div>
        </div>

        {/* Item Inspection Cards */}
        <div className="space-y-4 lg:col-span-8">
          {compartmentItems.map((item) => {
            const existingAnswer = answers[item.id];
            const isPickingSeize = seizeTargetId === item.id;
            const dateReceived = formatRelativeMalayDate(item.dateReceivedOffsetDays);
            const expiryDate = formatRelativeMalayDate(item.expiryOffsetDays);
            const isTempOutOfRange =
              item.currentTemp < item.idealTempMin ||
              item.currentTemp > item.idealTempMax;

            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
              >
                {/* Card Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 bg-slate-50/80 px-5 py-3.5">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-kkm-teal">
                      {item.categoryLabel}
                    </span>
                    <h3 className="text-base font-extrabold text-slate-900">
                      {item.name}
                    </h3>
                  </div>
                  <div
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 font-mono-tech text-xs font-extrabold ${
                      isTempOutOfRange
                        ? 'border-red-200 bg-kkm-red-soft text-kkm-red'
                        : 'border-teal-200 bg-kkm-teal-soft text-kkm-teal'
                    }`}
                  >
                    <Thermometer className="h-4 w-4" />
                    Suhu Teras:{' '}
                    {item.currentTemp > 0
                      ? `+${item.currentTemp}°C`
                      : `${item.currentTemp}°C`}
                  </div>
                </div>

                {/* Inspection Telemetry Grid */}
                <div className="space-y-4 p-5">
                  <div className="grid gap-3 sm:grid-cols-3 text-xs">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-1 font-bold uppercase text-slate-500 text-[10px]">
                        <Layers className="h-3.5 w-3.5" />
                        Kedudukan Rak
                      </div>
                      <div className="font-bold text-slate-900">
                        {SHELF_LABELS[item.placementShelf]}
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-slate-600">
                        {item.placementNote}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-1 font-bold uppercase text-slate-500 text-[10px]">
                        {item.packagingCondition === 'intact' ? (
                          <PackageCheck className="h-3.5 w-3.5 text-kkm-teal" />
                        ) : (
                          <PackageX className="h-3.5 w-3.5 text-kkm-red" />
                        )}
                        Pembungkusan
                      </div>
                      <div className="font-bold text-slate-900">
                        {item.packagingCondition === 'intact'
                          ? 'Utuh & Bertutup'
                          : item.packagingCondition === 'damaged'
                            ? 'Rosak / Kemek'
                            : 'Terbuka / Tanpa Penutup'}
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-slate-600">
                        {item.packagingLabel}
                      </p>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                      <div className="mb-1 flex items-center gap-1 font-bold uppercase text-slate-500 text-[10px]">
                        <CalendarClock className="h-3.5 w-3.5" />
                        Tag Tarikh &amp; FIFO
                      </div>
                      <div className="font-mono-tech text-[11px] text-slate-800">
                        <div>
                          Terima: <strong>{dateReceived}</strong>
                        </div>
                        <div>
                          Luput: <strong>{expiryDate}</strong>
                        </div>
                      </div>
                      <p className="mt-1 text-[11px] leading-snug text-slate-600">
                        {item.fifoComparisonNote}
                      </p>
                    </div>
                  </div>

                  {/* Decision / Result */}
                  {existingAnswer ? (
                    <div
                      className={`rounded-xl border p-3.5 ${
                        existingAnswer.isCorrect
                          ? 'border-green-200 bg-kkm-green-soft'
                          : 'border-red-200 bg-kkm-red-soft'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs font-extrabold">
                        <span
                          className={`flex items-center gap-1.5 ${
                            existingAnswer.isCorrect
                              ? 'text-kkm-green'
                              : 'text-kkm-red'
                          }`}
                        >
                          {existingAnswer.isCorrect ? (
                            <CheckCircle2 className="h-4 w-4" />
                          ) : (
                            <XCircle className="h-4 w-4" />
                          )}
                          {existingAnswer.isCorrect
                            ? 'Audit Tepat!'
                            : 'Audit Kurang Tepat'}
                        </span>
                        <span className="font-mono-tech text-slate-700">
                          {existingAnswer.pointsAwarded >= 0
                            ? `+${existingAnswer.pointsAwarded}`
                            : existingAnswer.pointsAwarded}{' '}
                          mata
                        </span>
                      </div>
                      <p className="mt-1.5 text-xs leading-relaxed text-slate-700">
                        {item.defectReason}
                      </p>
                      <div className="mt-1 font-mono-tech text-[11px] font-semibold text-kkm-blue">
                        {item.kssmReference}
                      </div>
                    </div>
                  ) : !isPickingSeize ? (
                    <div className="grid gap-3 sm:grid-cols-2">
                      <button
                        type="button"
                        onClick={() => handleSafeDecision(item)}
                        className="flex items-center justify-center gap-2 rounded-xl bg-kkm-green px-4 py-3 text-xs font-extrabold tracking-wide text-white shadow-sm transition hover:bg-green-800 active:scale-[0.98]"
                      >
                        <ShieldCheck className="h-4 w-4" />
                        SELAMAT DISIMPAN
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          playClickSound();
                          setSeizeTargetId(item.id);
                        }}
                        className="flex items-center justify-center gap-2 rounded-xl bg-kkm-red px-4 py-3 text-xs font-extrabold tracking-wide text-white shadow-sm transition hover:bg-red-800 active:scale-[0.98]"
                      >
                        <ShieldAlert className="h-4 w-4" />
                        SITA / ROSAK
                      </button>
                    </div>
                  ) : (
                    <div className="rounded-xl border-2 border-kkm-red/40 bg-red-50/50 p-4 animate-fade-in-up">
                      <div className="mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs font-extrabold text-kkm-red">
                          <AlertTriangle className="h-4 w-4" />
                          Pilih Sebab Sitaan Utama:
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            playClickSound();
                            setSeizeTargetId(null);
                          }}
                          className="text-xs font-bold text-slate-500 underline hover:text-slate-800"
                        >
                          Batal
                        </button>
                      </div>
                      <div className="space-y-2">
                        {item.violationOptions.map((opt, idx) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleConfirmSeize(item, idx)}
                            className="flex w-full items-center gap-2.5 rounded-lg border border-red-200 bg-white px-3.5 py-2.5 text-left text-xs font-semibold text-slate-800 transition hover:border-kkm-red hover:bg-kkm-red hover:text-white"
                          >
                            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-red-100 font-mono-tech text-[11px] font-bold text-kkm-red">
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
            );
          })}
        </div>
      </div>

      {/* Instant Feedback Modal */}
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
                      ? 'Keputusan Audit Tepat!'
                      : 'Keputusan Kurang Tepat'}
                  </h3>
                  <p className="text-xs opacity-90">{feedback.item.name}</p>
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
                  {feedback.correctChoice}
                </div>
              )}

              <div>
                <div className="mb-1 text-xs font-bold uppercase tracking-wide text-slate-500">
                  Penjelasan Piawaian KSSM Subtopik 2.3
                </div>
                <p className="text-sm leading-relaxed text-slate-700">
                  {feedback.item.defectReason}
                </p>
              </div>

              <div className="rounded-xl bg-slate-100 px-3.5 py-2.5 font-mono-tech text-[11px] font-semibold text-kkm-blue">
                Rujukan: {feedback.item.kssmReference}
              </div>

              <button
                type="button"
                onClick={handleCloseFeedback}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-kkm-blue px-5 py-3 text-sm font-bold text-white transition hover:bg-kkm-blue-dark"
              >
                {resolvedCount >= level3StorageItems.length
                  ? 'Selesai & Lihat Rumusan Akhir'
                  : 'Teruskan Pemeriksaan Stor'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
