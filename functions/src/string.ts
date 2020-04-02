import { Message } from './message';
import { humanDate, WeekRange } from './time';

export function twoDigit(num: number): string {
  return ('0' + num).slice(-2);
}

export function hasPunctuation(text: string): boolean {
  return ['.', '?', '!']
    .map((ending) => text.endsWith(ending))
    .some((result) => result);
}

export function eodLine({ user_name, text }: Message): string {
  return `- ${user_name}: ${eodText(text)}`;
}

export function eodText(text: string): string {
  const cleanText = capitalizeFirstLetter(text.trim());
  return hasPunctuation(cleanText) ? cleanText : `${cleanText}.`;
}

export function eodMessage(dateId: string, messages: Message[]): string {
  return `
EODs for ${humanDate(dateId)}:
${messages.map((msg) => eodLine(msg)).join('\n')}`;
}

export function eodWeekMessage(weekRange: WeekRange, messages: Message[]) {
  return `
Your EODs from ${humanDate(weekRange.startDateId)} to ${humanDate(
    weekRange.endDateId
  )}:
${messages.map((msg) => eodLine(msg)).join('\n')}`;
}

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
