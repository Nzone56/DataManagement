import { MainLayout } from "../../layouts/MainLayout";
import { AccordionsContainer, MainAccordionSummary, StatsContainer } from "./Stats.styled";
import { Fragment, useState } from "react";
import { Accordion, AccordionDetails, Typography, Select, MenuItem } from "@mui/material";
import { ExpandMore as ExpandIcon } from "@mui/icons-material";
import { StatCard } from "./StatCard";
import { CenteredBox } from "../../Components.styled";
import { StatsFilters } from "./StatsFilters";
import { useDateFilters } from "../../../hooks/useDateFilters";
import { useCharts } from "../../../hooks/useCharts";

// Tipo para cada gráfico dentro de una categoría

export const StatsPage = () => {
  const [chartSelect, setChartSelect] = useState<string>("all");
  const { filters, handleDateFilterChange, handleChangeFilterProp, handleChangeDate, isDateInFilter } =
    useDateFilters();

  const statCategories = useCharts({
    filters,
    chartSelect,
    isDateInFilter,
  });
  return (
    <MainLayout>
      <StatsContainer>
        <StatsFilters
          filters={filters}
          handleChangeDate={handleChangeDate}
          handleDateFilterChange={handleDateFilterChange}
          handleChangeFilterProp={handleChangeFilterProp}
          isDateInFilter={isDateInFilter}
        />
        <AccordionsContainer>
          {Object.entries(statCategories).map(([key, { title, charts }]) => (
            <Accordion key={key}>
              <MainAccordionSummary expandIcon={<ExpandIcon fontSize="large" />}>
                <Typography variant="h3">{title.toLocaleUpperCase()}</Typography>
              </MainAccordionSummary>
              <AccordionDetails>
                {charts.map(({ id, title, type, categories, series, colors, formatter, selectOptions = [] }) => (
                  <Fragment key={id}>
                    {selectOptions?.length > 0 ? (
                      <CenteredBox mb={2}>
                        <Typography variant="h6" mr={1}>
                          Concepto de Gasto:{" "}
                        </Typography>
                        <Select
                          value={chartSelect}
                          onChange={(e) => setChartSelect(e.target.value)}
                          size="small"
                          displayEmpty
                          inputProps={{ "aria-label": "Without label" }}
                        >
                          <MenuItem value="all">Todos</MenuItem>
                          {selectOptions.map((option) => (
                            <MenuItem value={option.id} key={option.id}>
                              {option.name}
                            </MenuItem>
                          ))}
                        </Select>
                      </CenteredBox>
                    ) : null}

                    <StatCard
                      key={id}
                      title={title}
                      type={type}
                      categories={categories}
                      series={series}
                      colors={colors || []}
                      formatter={formatter}
                      chartSelect={chartSelect}
                    />
                  </Fragment>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </AccordionsContainer>
      </StatsContainer>
    </MainLayout>
  );
};
