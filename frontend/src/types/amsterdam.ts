export interface AmsterdamKey {
  xref: number;
  name: string;
}

export type DayOfWeek = 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday';

export const isDayOfWeek = (v: string): v is DayOfWeek => {
  switch (v) {
    case 'monday':
    case 'tuesday':
    case 'wednesday':
    case 'thursday':
    case 'friday':
    case 'saturday':
    case 'sunday':
      return true;
  }
  return false;
};

export const dayOfWeek = (v: DayOfWeek): string => {
  return v.charAt(0).toUpperCase() + v.substring(1);
};

const monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const monthName = (v: number): string => monthNames[v];

export const rankPlace = (r: number): string => {
  let suffix = 'th';
  if (r === 1) {
    suffix = 'st';
  } else if (r === 2) {
    suffix = 'nd';
  } else if (r === 3) {
    suffix = 'rd';
  }
  return r + suffix;
};
