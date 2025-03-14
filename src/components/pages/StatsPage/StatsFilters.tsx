import { Box, MenuItem, Select, Typography, SelectChangeEvent } from "@mui/material";
import DatePicker from "react-datepicker";
import { Filters } from "../../../hooks/useDateFilters";
import "./styles.scss";
import { format, subDays } from "date-fns";
import { es } from "date-fns/locale";
import { FilterCheckbox } from "./Stats.styled";
import { CenteredBox, ColumnJustifyFlex } from "../../Components.styled";

interface StatsFiltersProps {
  filters: Filters;
  handleDateFilterChange: (event: SelectChangeEvent<string>) => void;
  handleChangeFilterProp: (prop: string, event: SelectChangeEvent<string>) => void;
  handleChangeDate: (prop: "startDate" | "endDate", date: Date | null) => void;
  hideZeros: boolean;
  setHideZeros: React.Dispatch<React.SetStateAction<boolean>>;
}

export const StatsFilters: React.FC<StatsFiltersProps> = ({
  filters,
  handleDateFilterChange,
  handleChangeFilterProp,
  handleChangeDate,
  hideZeros,
  setHideZeros,
}) => {
  const years = Array.from({ length: 10 }, (_, i) => (2025 - i).toString());
  const months = [
    { id: "1", name: "Enero" },
    { id: "2", name: "Febrero" },
    { id: "3", name: "Marzo" },
    { id: "4", name: "Abril" },
    { id: "5", name: "Mayo" },
    { id: "6", name: "Junio" },
    { id: "7", name: "Julio" },
    { id: "8", name: "Agosto" },
    { id: "9", name: "Septiembre" },
    { id: "10", name: "Octubre" },
    { id: "11", name: "Noviembre" },
    { id: "12", name: "Diciembre" },
  ];

  const formatDate = (date: Date | null | undefined): string => {
    return date ? format(date, "dd 'de' MMMM 'de' yyyy", { locale: es }) : "";
  };

  const getDateFilterText = (filters: Filters): string => {
    if (filters.dateFilter === "today") {
      return formatDate(new Date());
    }
    if (filters.dateFilter === "yesterday") {
      return formatDate(subDays(new Date(), 1));
    }
    if (filters.dateFilter === "last7") {
      return `${formatDate(subDays(new Date(), 7))} - ${formatDate(new Date())}`;
    }
    if (filters.dateFilter === "range") {
      return filters.startDate && filters.endDate
        ? `${formatDate(filters.startDate)} - ${formatDate(filters.endDate)}`
        : "Rango de fechas no especificado";
    }
    if (filters.dateFilter === "month") {
      return `${filters.selectedMonth} de ${filters.selectedYear}`;
    }
    if (filters.dateFilter === "year") {
      return filters.selectedYear;
    }
    if (filters.dateFilter === "all") {
      return "Todas las fechas";
    }
    return "Filtro no válido";
  };

  return (
    <ColumnJustifyFlex>
      <Typography mb={1}>{`FILTROS POR FECHA: ${getDateFilterText(filters)}`}</Typography>
      <Select
        value={filters.dateFilter}
        onChange={handleDateFilterChange}
        size="small"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
        sx={{ maxWidth: "150px" }}
      >
        <MenuItem value="all">Todos</MenuItem>
        <MenuItem value="today">Hoy</MenuItem>
        <MenuItem value="yesterday">Ayer</MenuItem>
        <MenuItem value="last7">Últimos 7 días</MenuItem>
        <MenuItem value="year">Año</MenuItem>
        <MenuItem value="month">Mes</MenuItem>
        <MenuItem value="range">Rango</MenuItem>
      </Select>
      {(filters.dateFilter === "year" || filters.dateFilter === "month") && (
        <Box display="flex" gap={2} mt={1}>
          <Select value={filters.selectedYear} onChange={(e) => handleChangeFilterProp("selectedYear", e)} size="small">
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
          {filters.dateFilter === "month" && (
            <Select
              value={filters.selectedMonth}
              onChange={(e) => handleChangeFilterProp("selectedMonth", e)}
              size="small"
            >
              {months.map((month) => (
                <MenuItem key={month.id} value={month.id}>
                  {month.name}
                </MenuItem>
              ))}
            </Select>
          )}
        </Box>
      )}
      {filters.dateFilter === "range" && (
        <Box mt={1}>
          <Typography> Rango de fechas </Typography>
          <Box display="flex" gap={2} mt={1}>
            <DatePicker
              wrapperClassName="datePicker"
              selected={filters.startDate}
              onChange={(date) => handleChangeDate("startDate", date)}
              selectsStart
              startDate={filters.startDate}
              endDate={filters.endDate}
              maxDate={new Date()}
            />
            <DatePicker
              selected={filters.endDate}
              onChange={(date) => handleChangeDate("endDate", date)}
              selectsEnd
              startDate={filters.startDate}
              endDate={filters.endDate}
              minDate={filters.startDate || undefined}
            />
          </Box>
        </Box>
      )}
      <CenteredBox mt={2}>
        <Typography>Ocultar items sin valores en las gráficas:</Typography>
        <FilterCheckbox checked={hideZeros} onClick={() => setHideZeros((prev) => !prev)} />
      </CenteredBox>
    </ColumnJustifyFlex>
  );
};
