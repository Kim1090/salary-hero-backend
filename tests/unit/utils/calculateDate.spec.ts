import { DateTime } from "luxon";

import { getNumberOfDaysInCurrentMonth } from "../../../src/utils/calculateDate";

describe("unit test: getNumberOfDaysInCurrentMonth", () => {
  test("success: get days of Month", () => {
    const currentMonth = DateTime.now().setZone("Asia/Bangkok").daysInMonth;
    const daysOfCurrentMonth = getNumberOfDaysInCurrentMonth();
    expect(daysOfCurrentMonth).toBe(currentMonth);
  });
});
