import Chart from "react-apexcharts";
import { ColumnAlignFlex } from "../Components.styled";
import { AreaGraphDashboardTitle } from "./Graphs.styled";

interface PieProps {
  series: number[];
  categories: string[];
  colors: string[];
}
export const SimplePieChart: React.FC<PieProps> = ({ categories, series, colors }) => {
  const options = {
    labels: categories,
    colors: colors,
    yaxis: {
      labels: {
        formatter: function (value: number) {
          return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(value);
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          return new Intl.NumberFormat("es-CO", {
            style: "currency",
            currency: "COP",
            maximumFractionDigits: 0,
          }).format(value);
        },
      },
    },
  };

  return (
    <ColumnAlignFlex style={{ fontSize: "25px" }}>
      <AreaGraphDashboardTitle className="text-center text-lg font-bold mb-2">
        Gastos categorias
      </AreaGraphDashboardTitle>
      <Chart options={options} series={series} type="pie" width="500px" />
    </ColumnAlignFlex>
  );
};
