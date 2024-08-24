import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "./Button";
import { Calendar } from "./Calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import { cn } from "../../utils/cn";
import { useState } from "react";

interface IProps {
  name?: string;
  defaultValue?: string;
  onChange?: (date: string) => void;
}

export function DatePicker({ name, defaultValue, onChange }: IProps) {
  const [date, setDate] = useState<string | undefined>(defaultValue);

  const onDateSelect = (date: Date | undefined) => {
    if (!date) {
      return;
    }

    typeof onChange === "function" && onChange(date.toISOString());
    setDate(date.toISOString());
  };

  return (
    <>
      <input id={name} type="hidden" name={name} value={date} className="sr-only" />

      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>

        <PopoverContent className="w-auto p-0">
          <Calendar mode="single" selected={new Date(date ?? "")} onSelect={onDateSelect} initialFocus />
        </PopoverContent>
      </Popover>
    </>
  );
}
