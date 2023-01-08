import { isBefore } from "date-fns";

export const comparedStartAndEnd = (
  startDate: string,
  endDate: string
): boolean => {
  if (startDate === endDate) {
    return true;
  }

  return isBefore(new Date(startDate), new Date(endDate));
};
