import { MainLayout } from "../../layouts/MainLayout";
import { AccordionsContainer, MainAccordionSummary, StatsContainer, StyledTab } from "./Stats.styled";
import { Fragment, useEffect, useRef, useState } from "react";
import { Accordion, AccordionDetails, Typography, Select, MenuItem, Tabs, Box } from "@mui/material";
import { ExpandMore as ExpandIcon } from "@mui/icons-material";
import { StatCard } from "./StatCard";
import { CenteredBox } from "../../Components.styled";
import { StatsFilters } from "./StatsFilters";
import { useDateFilters } from "../../../hooks/useDateFilters";
import { StatcategoryId, useCharts } from "../../../hooks/useCharts";
import FilterMenu from "./FilterMenu";
import { useLoadData } from "../../../hooks/useLoadData";
import { Spinner } from "../../ui/Spinner";

type FilterCategory = {
  name: string;
  enabled: boolean;
};

export const StatsPage = () => {
  const [chartSelect, setChartSelect] = useState<string>("all");
  const [hideZeros, setHideZeros] = useState(true);
  const [currentTab, setCurrentTab] = useState(0);
  const { filters, handleDateFilterChange, handleChangeFilterProp, handleChangeDate, isDateInFilter } =
    useDateFilters();
  const { statCategories, filterChartData } = useCharts({
    filters,
    chartSelect,
    isDateInFilter,
  });
  const loadingData = useLoadData(currentTab);
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

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={currentTab} onChange={(_, value: number) => setCurrentTab(value)} aria-label="Graphs Tabs">
            <StyledTab value={0} label="Gastos" disabled={loadingData} />
            <StyledTab value={1} label="Abogados" disabled={loadingData} />
            <StyledTab value={2} label="Clientes" disabled={loadingData} />
            <StyledTab value={3} label="Facturación" disabled={loadingData} />
          </Tabs>
        </Box>

        {loadingData ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
            <Spinner />
          </Box>
        ) : (
          <AccordionsContainer>
            {Object.entries(statCategories).map(
              ([key, { title, charts, selectOptions = [], filterCategories = false }], index) => (
                <Box key={key} role="tabpanel" hidden={currentTab !== index}>
                  <Accordion>
                    <MainAccordionSummary expandIcon={<ExpandIcon fontSize="large" />}>
                      <Typography variant="h3">{title.toLocaleUpperCase()}</Typography>
                    </MainAccordionSummary>
                    <AccordionDetails>
                      <Fragment key={title}>
                        {selectOptions?.length > 0 && (
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
                        )}
                        {filterCategories && (
                          <FilterMenu localCategories={localCategories} setLocalCategories={setLocalCategories} />
                        )}
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
                </Box>
              )
            )}
          </AccordionsContainer>
        )}
      </StatsContainer>
    </MainLayout>
  );
};
