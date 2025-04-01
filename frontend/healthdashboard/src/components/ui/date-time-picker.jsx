"use client";
import { useId, useState, useEffect } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, ClockIcon } from "lucide-react";

export function DateTimePicker({ date, setDate }) {
  const id = useId();

  const formatTimeForInput = (date) => {
    return date
      ? `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}:${String(date.getSeconds()).padStart(2, "0")}`
      : "12:00:00";
  };

  const [timeValue, setTimeValue] = useState(formatTimeForInput(date));
  const [timeError, setTimeError] = useState("");

  useEffect(() => {
    setTimeValue(formatTimeForInput(date));
  }, [date]);

  const validateTime = (time) => {
    if (!time) {
      setTimeError("Time is required");
      return false;
    }

    const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(?::([0-5][0-9]))?$/;
    if (!timeRegex.test(time)) {
      setTimeError("Invalid time format");
      return false;
    }

    setTimeError("");
    return true;
  };

  const handleTimeChange = (e) => {
    const newTimeValue = e.target.value;
    setTimeValue(newTimeValue);

    if (validateTime(newTimeValue) && date) {
      updateDateWithTime(newTimeValue);
    }
  };

  const updateDateWithTime = (timeString) => {
    const newDate = new Date(date);
    const [hours, minutes, seconds] = timeString.split(":").map(Number);

    newDate.setHours(hours || 0);
    newDate.setMinutes(minutes || 0);
    newDate.setSeconds(seconds || 0);

    setDate(newDate);
  };

  const handleDateSelect = (newDate) => {
    if (!newDate) {
      setDate(null);
      return;
    }

    const updatedDate = new Date(newDate);

    if (date) {
      updatedDate.setHours(
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
      );
    } else {
      const [hours, minutes, seconds] = timeValue.split(":").map(Number);
      updatedDate.setHours(hours || 0, minutes || 0, seconds || 0);
    }

    setDate(updatedDate);
  };

  return (
    <div className="rounded-md border p-4 flex flex-col gap-4">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full pl-3 text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            {date ? format(date, "PPP") : <span>Pick a date</span>}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            className="p-2"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) =>
              date < new Date() || date < new Date("1900-01-01")
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>

      <div>
        <Label htmlFor={id} className="mb-2 block">
          Time
        </Label>
        <div className="relative grow">
          <Input
            id={id}
            type="time"
            step="1"
            value={timeValue}
            onChange={handleTimeChange}
            className={cn(
              "peer appearance-none pe-9 [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none",
              timeError && "border-red-500",
            )}
          />
          <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-4 flex items-center justify-center peer-disabled:opacity-50">
            <ClockIcon size={16} aria-hidden="true" />
          </div>
        </div>
        {timeError && <p className="text-sm text-red-500 mt-1">{timeError}</p>}
      </div>
    </div>
  );
}