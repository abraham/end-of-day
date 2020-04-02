import * as moment from 'moment';
import { DateID } from './ids';

export interface WeekRange {
  startDateId: DateID;
  endDateId: DateID;
}

export const HOUR = 60 * 60 * 1000;
export const TIMEZONES: { [index: string]: number } = { CT: -5 * HOUR };
export const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function currentDateId(offset: number = 5): string {
  return moment().subtract(offset, 'hours').endOf('day').format('YYYYMMDD');
}

export function humanDate(date: string): string {
  const month = Number(date.slice(-4, -2)) - 1;
  const day = Number(date.slice(-2));
  return `${MONTHS[month]}, ${day}${nth(day)}`;
}

export function nth(day: number): string {
  if (day > 3 && day < 21) return 'th';
  switch (day % 10) {
    case 1:
      return 'st';
    case 2:
      return 'nd';
    case 3:
      return 'rd';
    default:
      return 'th';
  }
}

export function weekRange(offset: number = 5): WeekRange {
  return {
    startDateId: oneWeekAgo(offset),
    endDateId: currentDateId(offset),
  };
}

export function oneWeekAgo(offset: number = 5): DateID {
  return moment()
    .subtract(offset, 'hours')
    .subtract(7, 'days')
    .startOf('day')
    .format('YYYYMMDD');
}
