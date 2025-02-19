import { StartBoxBetween } from "../../Components.styled";
import { DashboardAreaChart } from "../../graphs/DashboardAreaChart";
import { HomeContainer } from "./HomeData.styled";

export const DataPreview = () => {
  const expenses = [
    120000, 150000, 130000, 140000, 160000, 170000, 155000, 165000, 150000, 140000, 135000, 145000, 155000, 160000,
    170000,
  ];

  const sales = [
    200000, 220000, 210000, 230000, 240000, 250000, 235000, 245000, 230000, 220000, 215000, 225000, 235000, 240000,
    250000,
  ];

  const profits = sales.map((sale, index) => sale - expenses[index]);

  const expensesSeries = [{ name: "Gastos", data: expenses }];
  const salesSeries = [{ name: "Ingresos", data: sales }];
  const profitSseries = [{ name: "Ganancias", data: profits }];

  const categories = [
    "1 Feb",
    "2 Feb",
    "3 Feb",
    "4 Feb",
    "5 Feb",
    "6 Feb",
    "7 Feb",
    "8 Feb",
    "9 Feb",
    "10 Feb",
    "11 Feb",
    "12 Feb",
    "13 Feb",
    "14 Feb",
    "15 Feb",
  ];

  return (
    <HomeContainer>
      <StartBoxBetween mt={2}>
        <DashboardAreaChart title={"Ingresos"} series={salesSeries} categories={categories} colors={["green"]} />
        <DashboardAreaChart title={"Gastos"} series={expensesSeries} categories={categories} colors={["red"]} />
        <DashboardAreaChart title={"Ganancias"} series={profitSseries} categories={categories} colors={["blue"]} />
      </StartBoxBetween>
    </HomeContainer>
  );
};
