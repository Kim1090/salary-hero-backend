import { DateTime } from "luxon";

export function getTheFirstDayOfTheMonthInUTC() {
  const currentTimeBkk = DateTime.now().setZone("Asia/Bangkok");
  const firstDayOfMonth = currentTimeBkk.startOf("month");
  return firstDayOfMonth.toUTC();
}

export function getStartDateOfTheDayInUTC() {
  const currentTimeBkk = DateTime.now().setZone("Asia/Bangkok");
  const firstTimeOfTheDay = currentTimeBkk.startOf("day");
  return firstTimeOfTheDay.toUTC();
}

export function getCurrentDateTimeUTC() {
  return DateTime.now().setZone("UTC");
}

export function getNumberOfDaysInCurrentMonth(): number {
  const currentDate = DateTime.now();
  return currentDate.daysInMonth;
}
