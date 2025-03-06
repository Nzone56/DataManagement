import { Box, MenuItem, Select, Typography, Button, SelectChangeEvent } from "@mui/material";
import DatePicker from "react-datepicker";
import { Filters } from "../../../hooks/useDateFilters";
import "./styles.scss";

interface StatsFiltersProps {
  filters: Filters;
  handleDateFilterChange: (event: SelectChangeEvent<string>) => void;
  handleChangeFilterProp: (prop: string, event: SelectChangeEvent<string>) => void;
  handleChangeDate: (prop: "startDate" | "endDate", date: Date | null) => void;
  isDateInFilter: (eventTime: number, filters: Filters) => void;
}

export const StatsFilters: React.FC<StatsFiltersProps> = ({
  filters,
  handleDateFilterChange,
  handleChangeFilterProp,
  handleChangeDate,
  isDateInFilter,
}) => {
  const handleApplyFilters = () => {
    console.log(isDateInFilter(1740848400000, filters), filters);
  };

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

  return (
    <Box>
      <Typography mb={1}>FILTROS POR FECHA:</Typography>
      <Select
        value={filters.dateFilter}
        onChange={handleDateFilterChange}
        size="small"
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
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
      <Box mt={2}>
        <Button variant="contained" color="primary" onClick={handleApplyFilters}>
          Aplicar Filtros
        </Button>
      </Box>
    </Box>
  );
};
