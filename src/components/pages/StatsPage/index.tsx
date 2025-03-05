import { useSelector } from "react-redux";
// import { SimplePieChart } from "../../graphs/SimplePieChart";
import { MainLayout } from "../../layouts/MainLayout";
import { MainAccordionSummary, StatsContainer } from "./Stats.styled";
import { getExpenseConcepts, getExpenses } from "../../../store/expenses/expenses.selector";
import { Fragment, useMemo, useState } from "react";
import { Accordion, AccordionDetails, Typography, Select, MenuItem } from "@mui/material";
import { ExpandMore as ExpandIcon } from "@mui/icons-material";
import { StatCard } from "./StatCard";
import { getWorklogs } from "../../../store/worklogs/worklogs.selector";
import { getLawyers } from "../../../store/lawyers/lawyers.selector";
import { getClients } from "../../../store/clients/clients.selector";
import { getArrayPropById } from "../../../utils/getters";
import { CenteredBox } from "../../Components.styled";

// Tipo para cada gráfico dentro de una categoría
interface StatChart {
  id: string;
  title: string;
  type: "pie" | "bar";
  categories: string[];
  series: number[];
  colors?: string[];
  formatter: string;
  selectOptions?: { id: string; name: string }[];
}

interface StatcategoryId {
  title: string;
  charts: StatChart[];
}

export const StatsPage = () => {
  const [chartSelect, setChartSelect] = useState<string>("all");
  const { expensesConcepts } = useSelector(getExpenseConcepts);
  const { expenses } = useSelector(getExpenses);
  const { worklogs } = useSelector(getWorklogs);
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);

  // const conceptsCategories = useMemo(() => expensesConcepts.map((concept) => concept.name), [expensesConcepts]);
  const colorsConcepts = useMemo(() => expensesConcepts.map((concept) => concept.color), [expensesConcepts]);

  // const data = useMemo(() => {
  //   const expenseMap = expensesConcepts.reduce((acc, concept) => {
  //     acc[concept.id] = 0;
  //     return acc;
  //   }, {} as Record<string, number>);

  //   expenses.forEach((expense) => {
  //     if (Object.prototype.hasOwnProperty.call(expenseMap, expense.conceptId)) {
  //       expenseMap[expense.conceptId] += expense.amount;
  //     }
  //   });

  //   return Object.values(expenseMap);
  // }, [expenses, expensesConcepts]);

  // Datos procesados para cada gráfico
  const expenseData = useMemo(
    () =>
      chartSelect === "all"
        ? expensesConcepts.map((c) =>
            expenses.filter((e) => e.conceptId === c.id).reduce((sum, e) => sum + e.amount, 0)
          )
        : getArrayPropById(chartSelect, expensesConcepts, "categories").map((c) =>
            expenses.filter((e) => e.categoryId === c).reduce((sum, e) => sum + e.amount, 0)
          ),
    [expenses, expensesConcepts, chartSelect]
  );
  const expenseByConcept = useMemo(
    () =>
      chartSelect === "all"
        ? expensesConcepts.map((c) => c.name)
        : getArrayPropById(chartSelect, expensesConcepts, "categories"),
    [expensesConcepts, chartSelect]
  );

  const lawyerHours = useMemo(
    () =>
      lawyers.map((lawyer) =>
        worklogs.filter((w) => w.lawyerId === lawyer.id).reduce((sum, w) => sum + w.workedTime, 0)
      ),
    [worklogs, lawyers]
  );
  const lawyerNames = useMemo(() => lawyers.map((lawyer) => lawyer.name), [lawyers]);

  const clientsData = useMemo(() => clients.map(() => 1), [clients]);

  // const worklogEarnings = useMemo(() => worklogs.map((w) => w.total), [worklogs]);

  const statCategories: Record<string, StatcategoryId> = {
    expenses: {
      title: "Gastos",
      charts: [
        {
          id: "expensesTotalPie",
          title: "Gastos por Concepto (%)",
          type: "pie",
          categories: expenseByConcept,
          series: expenseData,
          colors: colorsConcepts,
          formatter: "money",
          selectOptions: expensesConcepts.map((expenseC) => ({ id: expenseC.id, name: expenseC.name })),
        },
        {
          id: "expensesTotalBar",
          title: "Gastos por Concepto (Total)",
          type: "bar",
          categories: expenseByConcept,
          series: expenseData,
          colors: colorsConcepts,
          formatter: "money",
        },
      ],
    },
    lawyers: {
      title: "Abogados",
      charts: [
        {
          id: "lawyerHours",
          title: "Minutos Trabajados",
          type: "bar",
          categories: lawyerNames,
          series: lawyerHours,
          formatter: "time",
        },
      ],
    },
    clients: {
      title: "Clientes",
      charts: [
        {
          id: "clientsCount",
          title: "Clientes Activos",
          type: "pie",
          categories: ["Clientes"],
          series: [clientsData.length],
          formatter: "total",
        },
      ],
    },
    // worklog: {
    //   title: "Worklog",
    //   charts: [
    //     {
    //       id: "worklogEarnings",
    //       title: "Ingresos por Worklog",
    //       type: "bar",
    //       categories: worklogs.map((w) => `Worklog ${w.id}`),
    //       series: worklogEarnings,
    //       formatter: "money",
    //     },
    //   ],
    // },
  };

  return (
    <MainLayout>
      <StatsContainer>
        {/* <SimplePieChart colors={colorsConcepts} categories={conceptsCategories} series={data} /> */}
        {Object.entries(statCategories).map(([key, { title, charts }]) => (
          <Accordion key={key} defaultExpanded>
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
      </StatsContainer>
    </MainLayout>
  );
};
