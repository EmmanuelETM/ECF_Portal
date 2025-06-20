import {
  formatISO,
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

export function getToday() {
  const date = new Date();

  const locale = date
    .toLocaleDateString("es-Do", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/");

  return `${locale[2]}-${locale[1]}-${locale[0]}`;
}

export function Today() {
  return {
    from: formatISO(startOfToday(), { representation: "date" }).toString(),
    to: formatISO(endOfToday(), { representation: "date" }).toString(),
  };
}

export function Yesterday() {
  return {
    from: formatISO(startOfYesterday(), { representation: "date" }).toString(),
    to: formatISO(endOfYesterday(), { representation: "date" }).toString(),
  };
}

export function ThisWeek() {
  return {
    from: formatISO(startOfWeek(new Date()), {
      representation: "date",
    }).toString(),
    to: formatISO(endOfWeek(new Date()), {
      representation: "date",
    }).toString(),
  };
}

export function ThisMonth() {
  return {
    from: formatISO(startOfMonth(new Date()), {
      representation: "date",
    }).toString(),
    to: formatISO(endOfMonth(new Date()), {
      representation: "date",
    }).toString(),
  };
}

export function ThisYear() {
  return {
    from: formatISO(startOfYear(new Date()), {
      representation: "date",
    }).toString(),
    to: formatISO(endOfYear(new Date()), { representation: "date" }).toString(),
  };
}

export function LastYear() {
  return {
    from: formatISO(subYears(startOfYear(new Date()), 1), {
      representation: "date",
    }).toString(),
    to: formatISO(subYears(endOfYear(new Date()), 1), {
      representation: "date",
    }).toString(),
  };
}
