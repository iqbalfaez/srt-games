import type {
  AnswerRecord,
  GradeInfo,
  SubtopicCode,
  SubtopicMastery,
} from '../types/game';

export const BASE_CORRECT_POINTS = 100;
export const STREAK_STEP_BONUS = 10;
export const INCORRECT_PENALTY = 40;
export const TIME_BONUS_PER_SECOND = 2;
export const LEVEL_DURATION_SECONDS = 120;

export const SUBTOPIC_TITLES: Record<SubtopicCode, string> = {
  '2.1': 'Kitchen Hygiene Practices',
  '2.2': 'Food Handler Hygiene & Attire',
  '2.3': 'Food Storage, Cold-Chain & FIFO',
};

/**
 * Calculates arcade point delta for a single answer.
 * Correct: +100 + (currentStreak * 10)
 * Incorrect: -40 (score floored at 0 by caller)
 */
export function calculateAnswerPoints(isCorrect: boolean, currentStreak: number): number {
  if (!isCorrect) {
    return -INCORRECT_PENALTY;
  }
  return BASE_CORRECT_POINTS + currentStreak * STREAK_STEP_BONUS;
}

/**
 * Applies point delta with a non-negative floor of 0.
 */
export function applyScoreDelta(currentScore: number, delta: number): number {
  return Math.max(0, currentScore + delta);
}

/**
 * Calculates time bonus upon level completion.
 * Practice mode grants 0 time bonus so timed mode stays meaningful.
 */
export function calculateTimeBonus(timeLeft: number, isPracticeMode: boolean): number {
  if (isPracticeMode || timeLeft <= 0) {
    return 0;
  }
  return Math.floor(timeLeft) * TIME_BONUS_PER_SECOND;
}

/**
 * Computes official MOH inspection grade strictly from academic accuracy percentage
 * so careful students who read explanations are never penalized by speed metrics.
 */
export function calculateGrade(correctCount: number, totalItems: number): GradeInfo {
  const accuracyPercent =
    totalItems > 0 ? Math.round((correctCount / totalItems) * 100) : 0;

  if (accuracyPercent >= 85) {
    return {
      grade: 'A',
      title: 'Grade A — Distinguished Inspector',
      subtitle: '5-Star Food Premises • Full Compliance with MOH Sanitation Standards',
      badgeColorClass: 'bg-kkm-green text-white border-kkm-green',
      accuracyPercent,
    };
  }

  if (accuracyPercent >= 60) {
    return {
      grade: 'B',
      title: 'Grade B — Pass with Conditions',
      subtitle: 'Improvement Notice • Several Sanitation Rules Need Review',
      badgeColorClass: 'bg-kkm-amber text-white border-kkm-amber',
      accuracyPercent,
    };
  }

  return {
    grade: 'C',
    title: 'Grade C — Inspection Failed',
    subtitle: 'Premises Closure Order under Section 11, Food Act 1983',
    badgeColorClass: 'bg-kkm-red text-white border-kkm-red',
    accuracyPercent,
  };
}

/**
 * Computes mastery percentage per KSSM Subtopic (2.1, 2.2, 2.3).
 */
export function calculateSubtopicMastery(
  answers: Record<string, AnswerRecord>,
  subtopicTotals: Record<SubtopicCode, number>
): SubtopicMastery[] {
  const codes: SubtopicCode[] = ['2.1', '2.2', '2.3'];
  const allAnswers = Object.values(answers);

  return codes.map((code) => {
    const total = subtopicTotals[code] || 0;
    const correct = allAnswers.filter(
      (record) => record.subtopic === code && record.isCorrect
    ).length;
    const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

    return {
      code,
      title: SUBTOPIC_TITLES[code],
      correct,
      total,
      percentage,
    };
  });
}
