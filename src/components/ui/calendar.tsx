import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <div className="relative">
      {/* Accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-teal-300 to-white opacity-40 rounded-t-2xl" />
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn(
          "p-6 rounded-2xl shadow-2xl bg-white/70 backdrop-blur-xl border border-blue-100",
          "ring-1 ring-blue-200",
          className
        )}
        classNames={{
          months: "flex flex-col sm:flex-row gap-8",
          month: "space-y-6",
          caption: "flex justify-center pt-2 relative items-center",
          caption_label: "text-xl font-extrabold text-blue-600 tracking-wide",
          nav: "space-x-2 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "ghost" }),
            "h-8 w-8 rounded-full bg-gradient-to-r from-blue-400 to-teal-300 text-white shadow hover:scale-110 hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-blue-400"
          ),
          nav_button_previous: "absolute left-2",
          nav_button_next: "absolute right-2",
          table: "w-full border-collapse",
          head_row: "flex",
          head_cell:
            "text-blue-400 rounded-md w-9 font-semibold text-base tracking-wide",
          row: "flex w-full mt-2",
          cell: "h-10 w-10 text-center text-base p-0 relative",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-10 w-10 p-0 font-normal rounded-full transition duration-200 hover:scale-110 hover:shadow-lg hover:bg-blue-50 focus:bg-blue-100 focus:ring-2 focus:ring-teal-300"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold shadow-xl ring-2 ring-blue-300 hover:scale-110 transition-all duration-200",
          day_today:
            "bg-white ring-2 ring-gradient-to-r ring-teal-400 ring-offset-2 text-blue-600 font-bold border border-blue-300 rounded-full animate-pulse",
          day_outside:
            "day-outside text-muted-foreground opacity-40 aria-selected:bg-blue-100 aria-selected:text-blue-400",
          day_disabled: "text-muted-foreground opacity-30",
          day_range_middle:
            "aria-selected:bg-blue-100 aria-selected:text-blue-500",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-5 w-5" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-5 w-5" />,
        }}
        {...props}
      />
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
