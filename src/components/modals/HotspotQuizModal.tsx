import { useState } from 'react';
import {
  AlertCircle,
  BookOpenCheck,
  CheckCircle2,
  MapPin,
  X,
  XCircle,
} from 'lucide-react';
import { level2KitchenHotspots } from '../../data/syllabusContent';
import { useGameStore } from '../../store/useGameStore';
import {
  playClickSound,
  playCorrectSound,
  playWrongSound,
} from '../../utils/sound';

export function HotspotQuizModal() {
  const hotspot = useGameStore((s) => s.activeModalHotspot);
  const setActiveModalHotspot = useGameStore((s) => s.setActiveModalHotspot);
  const answers = useGameStore((s) => s.answers);
  const processAnswer = useGameStore((s) => s.processAnswer);
  const completeCurrentLevel = useGameStore((s) => s.completeCurrentLevel);

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  if (!hotspot) return null;

  const existingAnswer = answers[hotspot.id];
  const isAnswered = Boolean(existingAnswer);

  const handleSelectOption = (idx: number) => {
    if (isAnswered) return;
    setSelectedIdx(idx);

    const isCorrect = idx === hotspot.correctOptionIndex;
    processAnswer({
      itemId: hotspot.id,
      level: 2,
      subtopic: hotspot.subtopic,
      isCorrect,
      itemTitle: `Pin #${hotspot.pinNumber}: ${hotspot.title}`,
      userChoice: hotspot.options[idx],
      correctChoice: hotspot.options[hotspot.correctOptionIndex],
      explanation: hotspot.explanation,
      kssmReference: hotspot.textbookReference,
    });

    if (isCorrect) playCorrectSound();
    else playWrongSound();
  };

  const handleClose = () => {
    playClickSound();
    setSelectedIdx(null);
    setActiveModalHotspot(null);

    const updatedAnswers = useGameStore.getState().answers;
    const allDone = level2KitchenHotspots.every((hs) =>
      Boolean(updatedAnswers[hs.id])
    );
    if (allDone) {
      completeCurrentLevel(2, level2KitchenHotspots.length);
    }
  };

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={hotspot.title}
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl animate-fade-in-up">
        {/* Top Bar */}
        <div className="flex items-start justify-between gap-3 border-b border-slate-200 bg-kkm-blue px-5 py-4 text-white">
          <div>
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-md bg-white/15 px-2 py-0.5 font-mono-tech text-xs font-bold">
                <MapPin className="h-3 w-3" />
                PIN #{hotspot.pinNumber} • {hotspot.zoneLabel}
              </span>
              <span className="rounded-md bg-kkm-teal px-2 py-0.5 font-mono-tech text-xs font-bold">
                Subtopic {hotspot.subtopic}
              </span>
            </div>
            <h3 className="text-base font-extrabold leading-snug">
              {hotspot.title}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg p-1.5 text-blue-100 hover:bg-white/15 hover:text-white"
            aria-label="Close inspection modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 p-5">
          {/* Observation Evidence Box */}
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="mb-1 flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <AlertCircle className="h-3.5 w-3.5 text-kkm-teal" />
              On-Site Visual Observation
            </div>
            <p className="text-sm leading-relaxed text-slate-800">
              {hotspot.description}
            </p>
          </div>

          {/* Question & 3 Options */}
          <div>
            <p className="mb-3 text-sm font-bold text-slate-900">
              {hotspot.question}
            </p>
            <div className="space-y-2.5">
              {hotspot.options.map((option, idx) => {
                const isCorrectOption = idx === hotspot.correctOptionIndex;
                const isChosen =
                  selectedIdx === idx ||
                  (existingAnswer && existingAnswer.userChoice === option);

                let style =
                  'border-slate-200 bg-white text-slate-800 hover:border-kkm-blue hover:bg-kkm-blue-soft';
                if (isAnswered) {
                  if (isCorrectOption) {
                    style =
                      'border-kkm-green bg-kkm-green-soft text-slate-900 ring-1 ring-kkm-green';
                  } else if (isChosen && !isCorrectOption) {
                    style =
                      'border-kkm-red bg-kkm-red-soft text-slate-900 ring-1 ring-kkm-red';
                  } else {
                    style = 'border-slate-200 bg-slate-50 text-slate-400';
                  }
                }

                return (
                  <button
                    key={option}
                    type="button"
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(idx)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left text-xs font-medium leading-relaxed transition ${style}`}
                  >
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 font-mono-tech text-xs font-bold text-slate-700">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isAnswered && isCorrectOption && (
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-kkm-green" />
                    )}
                    {isAnswered && isChosen && !isCorrectOption && (
                      <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-kkm-red" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Immediate Educational Feedback */}
          {isAnswered && existingAnswer && (
            <div
              className={`rounded-xl border p-4 animate-fade-in-up ${
                existingAnswer.isCorrect
                  ? 'border-green-200 bg-kkm-green-soft'
                  : 'border-red-200 bg-kkm-red-soft'
              }`}
            >
              <div className="mb-1.5 flex items-center justify-between">
                <span
                  className={`flex items-center gap-1.5 text-sm font-extrabold ${
                    existingAnswer.isCorrect ? 'text-kkm-green' : 'text-kkm-red'
                  }`}
                >
                  {existingAnswer.isCorrect ? (
                    <CheckCircle2 className="h-4 w-4" />
                  ) : (
                    <XCircle className="h-4 w-4" />
                  )}
                  {existingAnswer.isCorrect
                    ? 'Accurate Audit Assessment!'
                    : 'Incorrect Assessment'}
                </span>
                <span className="font-mono-tech text-xs font-extrabold text-slate-800">
                  {existingAnswer.pointsAwarded >= 0
                    ? `+${existingAnswer.pointsAwarded}`
                    : existingAnswer.pointsAwarded}{' '}
                  pts
                </span>
              </div>
              <p className="text-xs leading-relaxed text-slate-700">
                {hotspot.explanation}
              </p>
              <div className="mt-2.5 flex items-center gap-1.5 font-mono-tech text-[11px] font-semibold text-kkm-blue">
                <BookOpenCheck className="h-3.5 w-3.5 shrink-0" />
                {hotspot.textbookReference}
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="mt-4 w-full rounded-xl bg-kkm-blue px-4 py-2.5 text-xs font-bold text-white transition hover:bg-kkm-blue-dark"
              >
                Done — Return to Kitchen Map
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
