const MALAY_MONTHS = [
  'Jan',
  'Feb',
  'Mac',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Ogs',
  'Sep',
  'Okt',
  'Nov',
  'Dis',
];

function addDays(base: Date, days: number): Date {
  const result = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

export function formatMalayDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = MALAY_MONTHS[date.getMonth()];
  const year = date.getFullYear();
  return `${day} ${month} ${year}`;
}

export function getInspectionDate(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

export function getInspectionDateLabel(): string {
  return formatMalayDate(getInspectionDate());
}

export function formatRelativeMalayDate(offsetDays: number, baseDate?: Date): string {
  const anchor = baseDate ?? getInspectionDate();
  return formatMalayDate(addDays(anchor, offsetDays));
}

export function generateCertificateCode(playerName: string): string {
  const year = getInspectionDate().getFullYear();
  const clean = playerName.trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
  const prefix = (clean.slice(0, 3) || 'SRT').padEnd(3, 'X');
  let hash = 0;
  for (let i = 0; i < playerName.length; i += 1) {
    hash = (hash * 31 + playerName.charCodeAt(i)) % 9000;
  }
  const num = String(1000 + Math.abs(hash)).slice(0, 4);
  return `KKM-SRT-${year}-${prefix}${num}`;
}
