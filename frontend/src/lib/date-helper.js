import {
  startOfToday,
  endOfToday,
  startOfYesterday,
  endOfYesterday,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  subYears,
} from "date-fns";

export function Today() {
  return {
    from: startOfToday().toString(),
    to: endOfToday().toString(),
  };
}

export function Yesterday() {
  return {
    from: startOfYesterday().toString(),
    to: endOfYesterday().toString(),
  };
}

export function ThisWeek() {
  return {
    from: startOfWeek(new Date()).toString(),
    to: endOfWeek(new Date()).toString(),
  };
}

export function ThisMonth() {
  return {
    from: startOfMonth(new Date()).toString(),
    to: endOfMonth(new Date()).toString(),
  };
}

export function ThisYear() {
  return {
    from: startOfYear(new Date()).toString(),
    to: endOfYear(new Date()).toString(),
  };
}

export function LastYear() {
  return {
    from: subYears(startOfYear(new Date()), 1).toString(),
    to: subYears(endOfYear(new Date()), 1).toString(),
  };
}
