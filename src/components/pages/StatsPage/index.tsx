import { MainLayout } from "../../layouts/MainLayout";
import { AccordionsContainer, MainAccordionSummary, StatsContainer } from "./Stats.styled";
import { Fragment, useEffect, useRef, useState } from "react";
import { Accordion, AccordionDetails, Typography, Select, MenuItem } from "@mui/material";
import { ExpandMore as ExpandIcon } from "@mui/icons-material";
import { StatCard } from "./StatCard";
import { CenteredBox } from "../../Components.styled";
import { StatsFilters } from "./StatsFilters";
import { useDateFilters } from "../../../hooks/useDateFilters";
import { StatcategoryId, useCharts } from "../../../hooks/useCharts";
import FilterMenu from "./FilterMenu";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/store";
import { fetchAllData } from "../../../store/actions";

type FilterCategory = {
  name: string;
  enabled: boolean;
};

export const StatsPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [chartSelect, setChartSelect] = useState<string>("all");
  const [hideZeros, setHideZeros] = useState(true);
  const { filters, handleDateFilterChange, handleChangeFilterProp, handleChangeDate, isDateInFilter } =
    useDateFilters();
  const { statCategories, filterChartData } = useCharts({
    filters,
    chartSelect,
    isDateInFilter,
  });

  const [localCategories, setLocalCategories] = useState<FilterCategory[]>([]);
  const prevStatCategories = useRef<Record<string, StatcategoryId> | null>(null);

  useEffect(() => {
    if (!statCategories || Object.keys(statCategories).length === 0) {
      return; // Dont run if statCategories its not available
    }

    if (prevStatCategories.current && JSON.stringify(prevStatCategories.current) === JSON.stringify(statCategories)) {
      return;
    }

    prevStatCategories.current = statCategories; // Save new reference

    const allCategories: FilterCategory[] = [];

    Object.values(statCategories).forEach(({ charts, filterCategories }) => {
      if (filterCategories) {
        charts.forEach(({ categories }) => {
          if (categories) {
            categories.forEach((category: string) => {
              if (!allCategories.some((c) => c.name === category)) {
                allCategories.push({ name: category, enabled: true });
              }
            });
          }
        });
      }
    });

    setLocalCategories(allCategories);
  }, [statCategories]);

  useEffect(() => {
    dispatch(fetchAllData());
  }, []);

  return (
    <MainLayout>
      <StatsContainer>
        <StatsFilters
          filters={filters}
          handleChangeDate={handleChangeDate}
          handleDateFilterChange={handleDateFilterChange}
          handleChangeFilterProp={handleChangeFilterProp}
          hideZeros={hideZeros}
          setHideZeros={setHideZeros}
        />
        <AccordionsContainer>
          {Object.entries(statCategories).map(
            ([key, { title, charts, selectOptions = [], filterCategories = false }]) => (
              <Accordion key={key}>
                <MainAccordionSummary expandIcon={<ExpandIcon fontSize="large" />}>
                  <Typography variant="h3">{title.toLocaleUpperCase()}</Typography>
                </MainAccordionSummary>
                <AccordionDetails>
                  <Fragment key={title}>
                    {selectOptions?.length > 0 ? (
                      <CenteredBox mb={2}>
                        <Typography variant="h6" mr={1}>
                          Filtro de Gasto:
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
                    {filterCategories ? (
                      <FilterMenu localCategories={localCategories} setLocalCategories={setLocalCategories} />
                    ) : null}
                    {charts.map(({ id, title, type, categories, series, colors, formatter }) => {
                      const { finalCategories, filteredSeries } = filterChartData({
                        categories,
                        series,
                        filterCategories,
                        localCategories,
                        hideZeros,
                      });

                      return (
                        <StatCard
                          key={id}
                          title={title}
                          type={type}
                          categories={finalCategories}
                          series={filteredSeries}
                          colors={colors || []}
                          formatter={formatter}
                          chartSelect={chartSelect}
                        />
                      );
                    })}
                  </Fragment>
                </AccordionDetails>
              </Accordion>
            )
          )}
        </AccordionsContainer>
      </StatsContainer>
    </MainLayout>
  );
};
