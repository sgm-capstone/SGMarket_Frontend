// src/utils/getDDay.ts
import dayjs from "dayjs";

export function getDDay(endDate: string): string {
  const today = dayjs().startOf("day");
  const end = dayjs(endDate).startOf("day");

  const diff = end.diff(today, "day");

  if (diff > 0) return `D -${diff}`;
  if (diff === 0) return "D-DAY";
  return "마감";
}
