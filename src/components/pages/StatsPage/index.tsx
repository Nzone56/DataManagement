import { useSelector } from "react-redux";
import { SimplePieChart } from "../../graphs/SimplePieChart";
import { MainLayout } from "../../layouts/MainLayout";
import { StatsContainer } from "./Stats.styled";
import { getExpenseConcepts, getExpenses } from "../../../store/expenses/expenses.selector";
import { useMemo } from "react";
import { Typography } from "@mui/material";

export const StatsPage = () => {
  const { expensesConcepts } = useSelector(getExpenseConcepts);
  const { expenses } = useSelector(getExpenses);

  const categories = useMemo(() => expensesConcepts.map((concept) => concept.name), [expensesConcepts]);
  const colors = useMemo(() => expensesConcepts.map((concept) => concept.color), [expensesConcepts]);

  const data = useMemo(() => {
    const expenseMap = expensesConcepts.reduce((acc, concept) => {
      acc[concept.id] = 0;
      return acc;
    }, {} as Record<string, number>);

    expenses.forEach((expense) => {
      if (Object.prototype.hasOwnProperty.call(expenseMap, expense.conceptId)) {
        expenseMap[expense.conceptId] += expense.amount;
      }
    });

    return Object.values(expenseMap);
  }, [expenses, expensesConcepts]);

  return (
    <MainLayout>
      <StatsContainer>
        {data.length === 0 ? (
          <Typography>Cargando datos...</Typography>
        ) : (
          <SimplePieChart colors={colors} categories={categories} series={data} />
        )}
      </StatsContainer>
    </MainLayout>
  );
};
