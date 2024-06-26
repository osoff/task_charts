"use client";

import { Card } from "@/components/ui/card";
import { CheckboxUI } from "./CheckboxUI";
import { DatePickerWithRange } from "./DatePicker";
import { useEffect, useState } from "react";
import AreaChartUI from "./AreaChart";
import { getData } from "../services/getData";
import { currencies } from "../constants";
import { addDays } from "date-fns";
import { useCurrency } from "../hooks/useCurrenc";
import { Loader2 } from "lucide-react";

const INIT_DAY = 7;

function Exchange() {
  const [curr, setCurr] = useState({ eur: false, usd: false, cny: false });
  const [date, setDate] = useState({
    from: addDays(new Date(), -INIT_DAY),
    to: new Date(),
  });

  const [requestCount, setRequestCount] = useState(INIT_DAY + 1);

  const { dataset, isPending } = useCurrency(date);
  const handleCheckboxChange = (key) => {
    setCurr((prevCurr) => ({
      ...prevCurr,
      [key]: !prevCurr[key],
    }));
  };

  useEffect(() => {
    const originalFetch = window.fetch;
    window.fetch = function (...args) {
      setRequestCount((prevCount) => prevCount + 1);
      return originalFetch.apply(this, args);
    };
    return () => {
      window.fetch = originalFetch;
    };
  }, []);

  return (
    <Card className="flex flex-col-reverse md:flex-row md:items-center md:justify-around shadow-2xl w-full p-6 gap-9 opacity-90 backdrop-blur-lg">
      <div className="flex flex-col gap-9 items-center md:items-start md:justify-between">
        <div className="flex md:flex-col gap-9 ">
          {currencies.map((currency) => (
            <CheckboxUI
              key={currency.key}
              id={currency.key}
              checked={curr[currency.key]}
              onChange={() => handleCheckboxChange(currency.key)}
            >
              {currency.label}
            </CheckboxUI>
          ))}
        </div>

        <div className="flex flex-col gap-1">
          <p>Выберите даты:</p>
          <div className="grid grid-rows-2 gap-1">
            <DatePickerWithRange date={date} setDate={setDate} />
            {date === undefined || !date.from ^ !date.to ? (
              <p className=" text-xs text-destructive">
                Укажите корректный диапазон дат!
              </p>
            ) : null}
          </div>
        </div>
        <div className="w-full text-left opacity-50">
          <p>Число запросов к API - {requestCount}</p>
        </div>
      </div>
      <div className=" w-full  h-[250px] md:h-[400px] lg:w-[500px] lg:h-[500px]">
        {isPending ? (
          <div className=" w-full h-full flex justify-center items-center text-xl">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Загрузка...
          </div>
        ) : (
          <AreaChartUI dataSet={dataset} activeLine={curr} />
        )}
      </div>
    </Card>
  );
}

export default Exchange;
