import { toast } from "@/components/ui/use-toast";
import { getDatesBetweenDates } from "../utils/helpers";

export async function getData(date) {
  console.log(date);
  try {
    if (date === undefined || !date.from ^ !date.to) {
      throw new Error("Укажите корректный диапазон дат!");
    } else {
      const masDates = getDatesBetweenDates(date.from, date.to);
      const req = masDates.map((time) =>
        fetch(
          `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@${time}/v1/currencies/rub.json`
        ).then((res) => res.json())
      );
      const res = await Promise.allSettled(req);
      console.log(res);
      const data = res
        .filter((el) => el.status === "fulfilled")
        .map((el) => {
          return {
            date: el.value.date,
            eur: 1 / el.value.rub.eur,
            usd: 1 / el.value.rub.usd,
            cny: 1 / el.value.rub.cny,
          };
        });
      console.log(data);
      return data;
    }
  } catch (e) {
    toast({
      variant: "destructive",
      title: "Упс... Что-то пошло не так",
      description: e.message,
    });
  }
}
