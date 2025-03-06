import { useMemo } from "react";
import { multiSeries } from "../utils/getTableOptions";
import { useSelector } from "react-redux";
import { getExpenseConcepts, getExpenses } from "../store/expenses/expenses.selector";
import { getWorklogs } from "../store/worklogs/worklogs.selector";
import { getLawyers } from "../store/lawyers/lawyers.selector";
import { getClients } from "../store/clients/clients.selector";
import { getArrayPropById } from "../utils/getters";
import { Filters } from "./useDateFilters";

interface StatChart {
  id: string;
  title: string;
  type: "pie" | "bar" | "bar-line";
  categories: string[];
  series: number[] | multiSeries[];
  colors?: string[];
  formatter: string;
  selectOptions?: { id: string; name: string }[];
}

interface StatcategoryId {
  title: string;
  charts: StatChart[];
}

export interface useChartsProps {
  filters: Filters;
  chartSelect: string;
  isDateInFilter: (eventTime: number, filters: Filters) => boolean;
}

export const useCharts = ({ filters, chartSelect, isDateInFilter }: useChartsProps) => {
  const { expensesConcepts } = useSelector(getExpenseConcepts);
  const { expenses } = useSelector(getExpenses);
  const { worklogs } = useSelector(getWorklogs);
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);
  const colorsConcepts = useMemo(() => expensesConcepts.map((concept) => concept.color), [expensesConcepts]);

  // Datos procesados para cada gráfico
  const expenseData = useMemo(
    () =>
      chartSelect === "all"
        ? expensesConcepts.map((c) =>
            expenses
              .filter((e) => e.conceptId === c.id && isDateInFilter(e.date, filters))
              .reduce((sum, e) => sum + e.amount, 0)
          )
        : getArrayPropById(chartSelect, expensesConcepts, "categories").map((c) =>
            expenses
              .filter((e) => e.categoryId === c && isDateInFilter(e.date, filters))
              .reduce((sum, e) => sum + e.amount, 0)
          ),
    //eslint-disable-next-line
    [expenses, expensesConcepts, chartSelect, filters]
  );
  const expenseByConcept = useMemo(
    () =>
      chartSelect === "all"
        ? expensesConcepts.map((c) => c.name)
        : getArrayPropById(chartSelect, expensesConcepts, "categories"),
    [expensesConcepts, chartSelect]
  );

  const lawyerMinutesWorked = useMemo(
    () =>
      lawyers.map((lawyer) =>
        worklogs
          .filter((w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters))
          .reduce((sum, w) => sum + w.workedTime, 0)
      ),
    //eslint-disable-next-line
    [worklogs, lawyers, filters]
  );

  const lawyerMinutesBilled = useMemo(
    () =>
      lawyers.map((lawyer) =>
        worklogs
          .filter((w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado")
          .reduce((sum, w) => sum + w.workedTime, 0)
      ),
    //eslint-disable-next-line
    [worklogs, lawyers, filters]
  );

  const lawyerMinutesBilledvsWorked = useMemo(
    () => [
      {
        name: "Facturadas",
        type: "column",
        data:
          lawyers.map((lawyer) =>
            worklogs
              .filter(
                (w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado"
              )
              .reduce((sum, w) => sum + w.workedTime, 0)
          ) || 0,
      },
      {
        name: "Trabajadas",
        type: "line",
        data:
          lawyers.map((lawyer) =>
            worklogs
              .filter((w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters))
              .reduce((sum, w) => sum + w.workedTime, 0)
          ) || 0,
      },
    ],
    //eslint-disable-next-line
    [worklogs, lawyers, filters]
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
          id: "lawyerMinutesWorked",
          title: "Minutos Trabajados",
          type: "bar",
          categories: lawyerNames,
          series: lawyerMinutesWorked,
          formatter: "time",
        },
        {
          id: "lawyerMinutesBilled",
          title: "Minutos Facturados",
          type: "bar",
          categories: lawyerNames,
          series: lawyerMinutesBilled,
          formatter: "time",
        },
        {
          id: "lawyerMinutesBilledvsWorked",
          title: "Minutos Facturados vs Trabajados",
          type: "bar-line",
          categories: lawyerNames,
          series: lawyerMinutesBilledvsWorked,
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

  return statCategories;
};
