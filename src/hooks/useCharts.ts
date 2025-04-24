import { useMemo } from "react";
import { multiSeries } from "../utils/getTableOptions";
import { useSelector } from "react-redux";
import { getExpenseConcepts, getExpenses, getFees } from "../store/expenses/expenses.selector";
import { getWorklogs } from "../store/worklogs/worklogs.selector";
import { getLawyers } from "../store/lawyers/lawyers.selector";
import { getClients } from "../store/clients/clients.selector";
import { getArrayPropById } from "../utils/getters";
import { Filters } from "./useDateFilters";
import { getReceipts } from "../store/receipts/receipts.selector";
import { getBills } from "../store/bills/bills.selector";

//TODO: Fees graphs
interface StatChart {
  id: string;
  title: string;
  type: "pie" | "bar" | "bar-line";
  categories: string[];
  series: number[] | multiSeries[];
  colors?: string[];
  formatter: string;
}

export interface StatcategoryId {
  title: string;
  charts: StatChart[];
  filterCategories?: boolean;
  selectOptions?: { id: string; name: string }[];
}

type FilterParams = {
  categories: string[];
  series: number[] | multiSeries[];
  filterCategories: boolean;
  localCategories: { name: string; enabled: boolean }[];
  hideZeros: boolean;
};

export interface useChartsProps {
  filters: Filters;
  chartSelect: string;
  filteredCategories?: boolean;
  isDateInFilter: (eventTime: number, filters: Filters) => boolean;
}

export const useCharts = ({ filters, chartSelect, isDateInFilter }: useChartsProps) => {
  const { expensesConcepts } = useSelector(getExpenseConcepts);
  const { expenses } = useSelector(getExpenses);
  const { worklogs } = useSelector(getWorklogs);
  const { lawyers } = useSelector(getLawyers);
  const { clients } = useSelector(getClients);
  const { fees } = useSelector(getFees);
  const { receipts } = useSelector(getReceipts);
  const { bills } = useSelector(getBills);

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

  const clientReceipted = useMemo(
    () =>
      clients.map((client) =>
        receipts
          .filter((receipt) => receipt.clientId === client.id && isDateInFilter(receipt.date, filters))
          .reduce((sum, receipt) => sum + receipt.totalValue, 0)
      ),
    //eslint-disable-next-line
    [receipts, clients, filters]
  );

  const clientBilled = useMemo(
    () =>
      clients.map((client) =>
        bills
          .filter((bill) => bill.clientId === client.id && isDateInFilter(bill.issueDate, filters))
          .reduce((sum, bill) => sum + bill.totalValue, 0)
      ),
    //eslint-disable-next-line
    [bills, clients, filters]
  );

  const clientBilledvsReceipted = useMemo(
    () => [
      {
        name: "Pagado",
        type: "column",
        data:
          clients.map((client) =>
            receipts
              .filter((receipt) => receipt.clientId === client.id && isDateInFilter(receipt.date, filters))
              .reduce((sum, receipt) => sum + receipt.totalValue, 0)
          ) || 0,
      },
      {
        name: "Facturado",
        type: "line",
        data:
          clients.map((client) =>
            bills
              .filter((bill) => bill.clientId === client.id && isDateInFilter(bill.issueDate, filters))
              .reduce((sum, bill) => sum + bill.totalValue, 0)
          ) || 0,
      },
    ],
    //eslint-disable-next-line
    [receipts, bills, clients, filters]
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
      filterCategories: true,
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
    bills: {
      title: "Facturación / Ingresos",
      filterCategories: true,
      charts: [
        {
          id: "clientBilled",
          title: "Total facturado por Cliente",
          type: "bar",
          categories: clientNames,
          series: clientBilled,
          formatter: "money",
        },
        {
          id: "clientReceipted",
          title: "Total pagado por Cliente",
          type: "bar",
          categories: clientNames,
          series: clientReceipted,
          formatter: "money",
        },
        {
          id: "clientBilledvsReceipted",
          title: "Total Facturado vs Pagado por Cliente",
          type: "bar-line",
          categories: clientNames,
          series: clientBilledvsReceipted,
          formatter: "money",
        },
      ],
    },
  };

  const filterChartData = ({ categories, series, filterCategories, localCategories, hideZeros }: FilterParams) => {
    // Filtrar categorías si se aplica filterCategories
    let filteredCategories = filterCategories
      ? categories.filter((c) => localCategories.some((cat) => cat.name === c && cat.enabled))
      : categories;

    // Obtener los índices de las categorías activas
    let activeIndexes = categories
      .map((cat, index) => (filteredCategories.includes(cat) ? index : -1))
      .filter((index) => index !== -1);

    // Filtrar categorías sin valores si HideZeros es true
    if (hideZeros) {
      activeIndexes = activeIndexes.filter((index) =>
        Array.isArray(series)
          ? series.every((s) => typeof s === "object" && "data" in s)
            ? series.some((s) => s.data[index] !== 0) // Para multiSeries
            : series[index] !== 0 // Para array numérico
          : false
      );
    }

    // Obtener las categorías finales
    filteredCategories = activeIndexes.map((index) => categories[index]);

    // Filtrar series según los índices activos
    const filteredSeries = Array.isArray(series)
      ? series.every((s) => typeof s === "object" && "data" in s)
        ? series.map((serie) => ({
            ...serie,
            data: activeIndexes.map((index) => serie.data[index]), // Filtrar data en base a los índices activos
          }))
        : activeIndexes.map((index) => (series as number[])[index]) // Para series numéricas
      : series;

    // Ordenar los datos antes de retornarlos
    const { sortedCategories, sortedSeries } = sortChartData(filteredCategories, filteredSeries);

    return { finalCategories: sortedCategories, filteredSeries: sortedSeries };
  };

  const sortChartData = (categories: string[], series: number[] | multiSeries[]) => {
    // Si es un array numérico, ordenar directamente
    if (Array.isArray(series) && series.every((s) => typeof s === "number")) {
      const combined = categories.map((cat, index) => ({ cat, value: series[index] }));
      combined.sort((a, b) => b.value - a.value);

      return {
        sortedCategories: combined.map((item) => item.cat),
        sortedSeries: combined.map((item) => item.value),
      };
    }

    // Si es un multiSeries, ordenar basado en la suma de cada categoría
    if (Array.isArray(series) && series.every((s) => typeof s === "object" && "data" in s)) {
      const sums = categories.map((cat, index) => ({
        cat,
        sum: series.reduce((acc, serie) => acc + serie.data[index], 0),
        index,
      }));

      sums.sort((a, b) => b.sum - a.sum);
      const sortedIndexes = sums.map((item) => item.index);

      return {
        sortedCategories: sums.map((item) => item.cat),
        sortedSeries: series.map((serie) => ({
          ...serie,
          data: sortedIndexes.map((index) => serie.data[index]),
        })),
      };
    }

    return { sortedCategories: categories, sortedSeries: series };
  };

  return { statCategories, filterChartData };
};
