import { CalendarTimestamp } from "vuetify";
import { DateTime } from "luxon";

export interface CalendarTimes {
  now: CalendarTimestamp;
  today: CalendarTimestamp;
}

export interface VCalendar {
  title: string;
  times: CalendarTimes;

  timeToY(
    time: number | string | { hour: number; minute: number },
    clamp?: boolean
  ): number | false;
  updateTimes(): void;
  scrollToTime(time: number): void;
  next(): void;
  prev(): void;
}

export interface CalendarChangeEvent {
  start: CalendarTimestamp;
  end: CalendarTimestamp;
}

export interface CalendarEvent {
  name: string;
  start: Date;
  end: Date;
  timed: boolean;
  startLuxon: DateTime;
  endLuxon: DateTime;
}

export function dateBeforeTS(end: DateTime, now: CalendarTimestamp): boolean {
  if (end.year == now.year) {
    if (end.month == now.month) {
      if (end.day == now.day) {
        if (end.hour === now.hour) {
          return end.minute < now.minute;
        } else {
          return end.hour < now.hour;
        }
      } else {
        return end.day < now.day;
      }
    } else {
      return end.month < now.month;
    }
  } else {
    return end.year < now.year;
  }
}

export function calendarTSToDate(start: CalendarTimestamp): DateTime {
  return DateTime.local(
    start.year,
    start.month,
    start.day,
    start.hour,
    start.minute
  );
}
