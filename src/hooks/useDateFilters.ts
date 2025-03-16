import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";
import { subDays, isSameDay, isWithinInterval, getYear, getMonth } from "date-fns";
import { toZonedTime } from "date-fns-tz";

// TODO: VOLVERLO UN REDUCER DE REDUX
export interface Filters {
  dateFilter: string;
  startDate?: Date | null;
  endDate?: Date | null;
  selectedYear: string;
  selectedMonth: string;
}

export const useDateFilters = () => {
  const [filters, setFilters] = useState<Filters>({
    dateFilter: "all",
    startDate: null,
    endDate: null,
    selectedYear: "",
    selectedMonth: "",
  });

  const handleDateFilterChange = (event: SelectChangeEvent<string>) => {
    setFilters((prev) => ({ ...prev, dateFilter: event.target.value }));
  };

  const handleChangeFilterProp = (prop: string, event: SelectChangeEvent<string>) => {
    setFilters((prev) => ({ ...prev, [prop]: event.target.value }));
  };

  const handleChangeDate = (prop: "startDate" | "endDate", date: Date | null) => {
    if (!date) {
      setFilters((prev) => ({ ...prev, [prop]: null })); // Mantiene null en lugar de undefined
      return;
    }

    const adjustedDate = new Date(date);

    if (prop === "startDate") {
      adjustedDate.setHours(0, 0, 0, 0); // Comienza a medianoche
    } else if (prop === "endDate") {
      adjustedDate.setHours(23, 59, 59, 999); // Termina al final del día
    }

    setFilters((prev) => ({ ...prev, [prop]: adjustedDate })); // Guarda como objeto Date
  };

  const isDateInFilter = (eventTime: number, filters: Filters): boolean => {
    const timeZone = "America/Bogota"; // Zona horaria correcta
    const eventDate = toZonedTime(new Date(eventTime), timeZone);
    const now = toZonedTime(new Date(), timeZone);

    const filterFunctions: Record<string, (eventDate: Date) => boolean> = {
      today: () => isSameDay(eventDate, now),

      yesterday: () => isSameDay(eventDate, toZonedTime(subDays(now, 1), timeZone)),

      last7: () => eventDate.getTime() >= subDays(now, 7).getTime(),

      year: () => getYear(eventDate).toString() === filters.selectedYear,

      month: () =>
        getYear(eventDate).toString() === filters.selectedYear &&
        (getMonth(eventDate) + 1).toString() === filters.selectedMonth,

      range: () =>
        !!(
          filters.startDate &&
          filters.endDate &&
          isWithinInterval(eventDate, {
            start: toZonedTime(new Date(filters.startDate), timeZone), // Convertimos correctamente
            end: toZonedTime(new Date(filters.endDate), timeZone),
          })
        ),

      all: () => true,
    };

    return filterFunctions[filters.dateFilter]?.(eventDate) ?? true;
  };

  return { filters, handleDateFilterChange, isDateInFilter, handleChangeFilterProp, handleChangeDate };
};
