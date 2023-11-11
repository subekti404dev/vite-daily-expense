import { ITrx } from "../store/useMonthlyTrx";

export const fixDate = (date: string) => {
  return date.replace(" ", "T").split(".")?.[0] + "Z";
};

export const fixTrxDateFromArray = (arr: ITrx[]) => {
  return arr.map((t) => ({
    ...t,
    date: fixDate(t.date),
  }));
};
