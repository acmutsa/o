"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function DatePickerWithPresetsComponent({
  onChange,
}: {
  onChange: (...event: any) => void;
}) {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [month, setMonth] = React.useState<number>(new Date().getMonth());
  const [year, setYear] = React.useState<number>(new Date().getFullYear());

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 25 },
    (_, i) => new Date().getFullYear() - 40 + i
  );

  const handleMonthChange = (value: string) => {
    setMonth(parseInt(value));
    setDate(
      (prev) => new Date(prev!.getFullYear(), parseInt(value), prev!.getDay())
    );
    onChange(date);
  };

  const handleYearChange = (value: string) => {
    setYear(parseInt(value));
    onChange(date);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "clear-left flex w-full justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
        <div className="flex space-x-2">
          <Select onValueChange={handleMonthChange} value={month.toString()}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month, index) => (
                <SelectItem key={month} value={index.toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={handleYearChange} value={year.toString()}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="rounded-md border">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            month={new Date(year, month)}
            onMonthChange={(newMonth) => {
              setMonth(newMonth.getMonth());
              setYear(newMonth.getFullYear());
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
