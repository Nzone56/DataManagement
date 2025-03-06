import { SelectChangeEvent } from "@mui/material";
import { useState } from "react";

// VOLVERLO UN REDUCER DE REDUX
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
    const filterFunctions: Record<string, (eventTime: number) => boolean> = {
      today: () => {
        const today = new Date();
        return new Date(eventTime).toDateString() === today.toDateString();
      },
      yesterday: () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return new Date(eventTime).toDateString() === yesterday.toDateString();
      },
      last7: () => {
        const last7Days = new Date();
        last7Days.setDate(last7Days.getDate() - 7);
        return eventTime >= last7Days.getTime();
      },
      year: () => new Date(eventTime).getFullYear().toString() === filters.selectedYear,
      month: () =>
        new Date(eventTime).getFullYear().toString() === filters.selectedYear &&
        (new Date(eventTime).getMonth() + 1).toString() === filters.selectedMonth,
      range: () =>
        !!(
          filters.startDate &&
          filters.endDate &&
          eventTime >= new Date(filters.startDate).getTime() &&
          eventTime <= new Date(filters.endDate).getTime()
        ),
      all: () => true,
    };
    return filterFunctions[filters.dateFilter]?.(eventTime) ?? true;
  };

  return { filters, handleDateFilterChange, isDateInFilter, handleChangeFilterProp, handleChangeDate };
};
