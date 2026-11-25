export type SubtopicCode = '2.1' | '2.2' | '2.3';

export type ViolationCategory =
  | 'kebersihan_diri'
  | 'pakaian_pengendali'
  | 'sanitasi_dapur'
  | 'penyimpanan_makanan'
  | 'suhu_stor';

export type GameStage = 'menu' | 'level1' | 'level2' | 'level3' | 'summary';

export type GameMode = 'timed' | 'practice';

export type GloveStatus = 'none' | 'clean' | 'dirty';
export type FootwearType = 'closed_shoes' | 'slippers';
export type StaffDecision = 'pass' | 'reject';

export interface StaffAvatarConfig {
  gender: 'male' | 'female';
  skinTone: string;
  hairColor: string;
  shirtColor: string;
  hijab?: boolean;
}

export interface StaffProfile {
  id: string;
  staffCode: string;
  name: string;
  role: string;
  subtopic: SubtopicCode;
  category: ViolationCategory;
  avatar: StaffAvatarConfig;
  apron: boolean;
  apronClean: boolean;
  hairnet: boolean;
  jewelry: boolean;
  jewelryDetail: string;
  gloveStatus: GloveStatus;
  footwear: FootwearType;
  typhoidVaccineValid: boolean;
  /** Days relative to inspection date (positive = valid, negative = expired) */
  typhoidExpiryOffsetDays: number;
  slpmCertValid: boolean;
  hasOpenWound: boolean;
  cutsCovered: boolean;
  healthNotes: string;
  correctDecision: StaffDecision;
  /** Shown when player selects 'reject' to reinforce KSSM reasoning */
  violationOptions: string[];
  /** Index of the primary violation in violationOptions (-1 if compliant) */
  correctViolationIndex: number;
  explanation: string;
  kssmReference: string;
}

export type KitchenZone = 'cuci' | 'penyediaan' | 'memasak' | 'sisa';

export interface KitchenHotspot {
  id: string;
  pinNumber: number;
  /** Horizontal percentage coordinate (0–100) on the kitchen SVG */
  x: number;
  /** Vertical percentage coordinate (0–100) on the kitchen SVG */
  y: number;
  zone: KitchenZone;
  zoneLabel: string;
  title: string;
  description: string;
  subtopic: SubtopicCode;
  category: ViolationCategory;
  isViolation: boolean;
  question: string;
  options: string[];
  correctOptionIndex: number;
  explanation: string;
  textbookReference: string;
}

export type StorageCompartmentId = 'chiller' | 'freezer' | 'dry_store';
export type PackagingCondition = 'intact' | 'damaged' | 'uncovered';
export type PlacementShelf = 'top' | 'middle' | 'bottom' | 'floor';
export type StorageDecision = 'safe' | 'seize';

export interface StorageCompartmentEnv {
  id: StorageCompartmentId;
  name: string;
  englishName: string;
  ambientTemp: number;
  idealTempMin: number;
  idealTempMax: number;
  idealRangeLabel: string;
  isAmbientCompliant: boolean;
  ambientNote: string;
}

export interface StorageItem {
  id: string;
  name: string;
  categoryLabel: string;
  subtopic: SubtopicCode;
  category: ViolationCategory;
  compartment: StorageCompartmentId;
  currentTemp: number;
  idealTempMin: number;
  idealTempMax: number;
  packagingCondition: PackagingCondition;
  packagingLabel: string;
  placementShelf: PlacementShelf;
  placementNote: string;
  /** Days relative to inspection date */
  dateReceivedOffsetDays: number;
  /** Days relative to inspection date */
  expiryOffsetDays: number;
  fifoComparisonNote: string;
  isFIFOCompliant: boolean;
  isSafe: boolean;
  violationOptions: string[];
  correctViolationIndex: number;
  defectReason: string;
  kssmReference: string;
}

export interface AnswerRecord {
  itemId: string;
  level: 1 | 2 | 3;
  subtopic: SubtopicCode;
  isCorrect: boolean;
  userChoice: string;
  correctChoice: string;
  pointsAwarded: number;
}

export interface MistakeRecord {
  id: string;
  level: 1 | 2 | 3;
  itemTitle: string;
  userChoice: string;
  correctChoice: string;
  explanation: string;
  kssmReference: string;
  subtopic: SubtopicCode;
}

export interface SubtopicMastery {
  code: SubtopicCode;
  title: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface GradeInfo {
  grade: 'A' | 'B' | 'C';
  title: string;
  subtitle: string;
  badgeColorClass: string;
  accuracyPercent: number;
}

export interface LevelSummary {
  level: 1 | 2 | 3;
  correctCount: number;
  totalCount: number;
  timeBonus: number;
}
