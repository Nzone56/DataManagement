import { useMemo } from "react";
import { multiSeries } from "../utils/getTableOptions";
import { useSelector } from "react-redux";
import { getExpenseConcepts, getExpenses, getFees } from "../store/expenses/expenses.selector";
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
}

interface StatcategoryId {
  title: string;
  charts: StatChart[];
  selectOptions?: { id: string; name: string }[];
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
  const { fees } = useSelector(getFees);
  const colorsConcepts = useMemo(() => expensesConcepts.map((concept) => concept.color), [expensesConcepts]);

  // ----- SERIES ----- //
  const expenseByConcept = useMemo(
    () =>
      chartSelect === "all"
        ? expensesConcepts.map((c) => c.name)
        : getArrayPropById(chartSelect, expensesConcepts, "categories"),
    [expensesConcepts, chartSelect]
  );
  const feesCategories = ["Germán Ulloa", "Carlos Bermúdez"];
  const lawyerNames = useMemo(() => lawyers.map((lawyer) => lawyer.name), [lawyers]);
  const clientNames = useMemo(() => clients.map((client) => client.name), [clients]);

  // ----- CATEGORIES ----- /
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

  const feesData = useMemo(() => {
    return fees.reduce(
      (acc, d) => {
        if (isDateInFilter(d.date, filters)) {
          if (d.feeConcept === "Germán Ulloa") acc[0] += d.amount;
          else if (d.feeConcept === "Carlos Bermúdez") acc[1] += d.amount;
        }
        return acc;
      },
      [0, 0]
    );
    //eslint-disable-next-line
  }, [fees, filters]);

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
        name: "Facturados",
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
        name: "Trabajados",
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

  const lawyerRevenueWorked = useMemo(
    () =>
      lawyers.map((lawyer) =>
        worklogs
          .filter((w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters))
          .reduce((sum, w) => sum + w.total, 0)
      ),
    //eslint-disable-next-line
    [worklogs, lawyers, filters]
  );

  const lawyerRevenueBilled = useMemo(
    () =>
      lawyers.map((lawyer) =>
        worklogs
          .filter((w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado")
          .reduce((sum, w) => sum + w.total, 0)
      ),
    //eslint-disable-next-line
    [worklogs, lawyers, filters]
  );

  const lawyerRevenueBilledvsWorked = useMemo(
    () => [
      {
        name: "Facturado",
        type: "column",
        data:
          lawyers.map((lawyer) =>
            worklogs
              .filter(
                (w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado"
              )
              .reduce((sum, w) => sum + w.total, 0)
          ) || 0,
      },
      {
        name: "Generado",
        type: "line",
        data:
          lawyers.map((lawyer) =>
            worklogs
              .filter((w) => w.lawyerId === lawyer.id && isDateInFilter(w.dateWork, filters))
              .reduce((sum, w) => sum + w.total, 0)
          ) || 0,
      },
    ],
    //eslint-disable-next-line
    [worklogs, lawyers, filters]
  );

  const clientMinutesWorked = useMemo(
    () =>
      clients.map((client) =>
        worklogs
          .filter((w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters))
          .reduce((sum, w) => sum + w.workedTime, 0)
      ),
    //eslint-disable-next-line
    [worklogs, clients, filters]
  );

  const clientMinutesBilled = useMemo(
    () =>
      clients.map((client) =>
        worklogs
          .filter((w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado")
          .reduce((sum, w) => sum + w.workedTime, 0)
      ),
    //eslint-disable-next-line
    [worklogs, clients, filters]
  );

  const clientMinutesBilledvsWorked = useMemo(
    () => [
      {
        name: "Facturados",
        type: "column",
        data:
          clients.map((client) =>
            worklogs
              .filter(
                (w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado"
              )
              .reduce((sum, w) => sum + w.workedTime, 0)
          ) || 0,
      },
      {
        name: "Trabajados",
        type: "line",
        data:
          clients.map((client) =>
            worklogs
              .filter((w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters))
              .reduce((sum, w) => sum + w.workedTime, 0)
          ) || 0,
      },
    ],
    //eslint-disable-next-line
    [worklogs, clients, filters]
  );

  const clientRevenueWorked = useMemo(
    () =>
      clients.map((client) =>
        worklogs
          .filter((w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters))
          .reduce((sum, w) => sum + w.total, 0)
      ),
    //eslint-disable-next-line
    [worklogs, clients, filters]
  );

  const clientRevenueBilled = useMemo(
    () =>
      clients.map((client) =>
        worklogs
          .filter((w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado")
          .reduce((sum, w) => sum + w.total, 0)
      ),
    //eslint-disable-next-line
    [worklogs, clients, filters]
  );

  const clientRevenueBilledvsWorked = useMemo(
    () => [
      {
        name: "Facturado",
        type: "column",
        data:
          clients.map((client) =>
            worklogs
              .filter(
                (w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters) && w.status === "Facturado"
              )
              .reduce((sum, w) => sum + w.total, 0)
          ) || 0,
      },
      {
        name: "Generado",
        type: "line",
        data:
          clients.map((client) =>
            worklogs
              .filter((w) => w.clientId === client.id && isDateInFilter(w.dateWork, filters))
              .reduce((sum, w) => sum + w.total, 0)
          ) || 0,
      },
    ],
    //eslint-disable-next-line
    [worklogs, clients, filters]
  );

  // const worklogEarnings = useMemo(() => worklogs.map((w) => w.total), [worklogs]);

  const statCategories: Record<string, StatcategoryId> = {
    expenses: {
      title: "Gastos",
      selectOptions: expensesConcepts.map((expenseC) => ({ id: expenseC.id, name: expenseC.name })),
      charts: [
        {
          id: "expensesTotalPie",
          title: "Gastos por Concepto (%)",
          type: "pie",
          categories: expenseByConcept,
          series: expenseData,
          colors: colorsConcepts,
          formatter: "money",
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
        {
          id: "feesTotalPie",
          title: "Honorarios (%)",
          type: "pie",
          categories: feesCategories,
          series: feesData,
          formatter: "money",
        },
        {
          id: "feesTotalBar",
          title: "Honorarios (Total)",
          type: "bar",
          categories: feesCategories,
          series: feesData,
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
        {
          id: "lawyerRevenueWorked",
          title: "Total generado",
          type: "bar",
          categories: lawyerNames,
          series: lawyerRevenueWorked,
          formatter: "money",
        },
        {
          id: "lawyerRevenueBilled",
          title: "Total facturado",
          type: "bar",
          categories: lawyerNames,
          series: lawyerRevenueBilled,
          formatter: "money",
        },
        {
          id: "lawyerRevenueBilledvsWorked",
          title: "Total Facturado vs Generado",
          type: "bar-line",
          categories: lawyerNames,
          series: lawyerRevenueBilledvsWorked,
          formatter: "money",
        },
      ],
    },
    clients: {
      title: "Clientes",
      charts: [
        {
          id: "clientMinutesWorked",
          title: "Minutos Trabajados por Cliente",
          type: "bar",
          categories: clientNames,
          series: clientMinutesWorked,
          formatter: "time",
        },
        {
          id: "clientMinutesBilled",
          title: "Minutos Facturados por Cliente",
          type: "bar",
          categories: clientNames,
          series: clientMinutesBilled,
          formatter: "time",
        },
        {
          id: "clientMinutesBilledvsWorked",
          title: "Minutos Facturados vs Trabajados por Cliente",
          type: "bar-line",
          categories: clientNames,
          series: clientMinutesBilledvsWorked,
          formatter: "time",
        },
        {
          id: "clientRevenueWorked",
          title: "Total generado por Cliente",
          type: "bar",
          categories: clientNames,
          series: clientRevenueWorked,
          formatter: "money",
        },
        {
          id: "clientRevenueBilled",
          title: "Total facturado por Cliente",
          type: "bar",
          categories: clientNames,
          series: clientRevenueBilled,
          formatter: "money",
        },
        {
          id: "clientRevenueBilledvsWorked",
          title: "Total Facturado vs Generado por Cliente",
          type: "bar-line",
          categories: clientNames,
          series: clientRevenueBilledvsWorked,
          formatter: "money",
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
