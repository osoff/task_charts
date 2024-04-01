"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import { PopoverClose } from "@radix-ui/react-popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function DatePickerWithRange({ className, date, setDate }) {
  const [dateIn, setDateIn] = React.useState({
    from: addDays(new Date(), -7),
    to: new Date(),
  });
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-[300px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd.MM.yyyy")} -{" "}
                  {format(date.to, "dd.MM.yyyy")}
                </>
              ) : (
                format(date.from, "dd.MM.yyyy")
              )
            ) : (
              <span>Дата</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className="w-auto md:absolute md:-bottom-20"
          align="start"
        >
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateIn?.from}
            selected={dateIn}
            onSelect={setDateIn}
            numberOfMonths={1}
          />
          <PopoverClose
            className="flex w-full   justify-end"
            onClick={() => {
              setDate(dateIn);
            }}
          >
            Применить
          </PopoverClose>
        </PopoverContent>
      </Popover>
    </div>
  );
}
