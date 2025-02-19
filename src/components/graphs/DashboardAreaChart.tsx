import Chart from "react-apexcharts";
import { AreaGraphDashboardContainer, AreaGraphDashboardSubTitle, AreaGraphDashboardTitle } from "./Graphs.styled";
import { numberToCurrency } from "../../utils/formatter";

interface Series {
  name: string;
  data: number[];
}

interface DashboardAreaChartProps {
  title: string;
  series: Series[];
  chartHeight?: number;
  colors: string[];
  categories: string[];
}

export const DashboardAreaChart: React.FC<DashboardAreaChartProps> = ({
  title,
  series,
  categories,
  chartHeight = 120,
  colors,
}) => {
  const options = {
    chart: {
      id: "area-chart",
      toolbar: { show: false }, // Oculta el toolbar de ApexCharts
      sparkline: { enabled: true }, // Hace que sea un gráfico pequeño sin ejes
    },
    colors: [...colors], // Color gris oscuro
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 0.5,
        gradientToColors: ["#2c2c2c"], // Gradiente más oscuro
        inverseColors: false,
        opacityFrom: 0.6,
        opacityTo: 0.2,
        stops: [0, 100],
      },
    },
    xaxis: {
      labels: { show: false },
      axisBorder: { show: false },
      axisTicks: { show: false },
      categories: categories,
    },
    yaxis: {
      labels: { show: false },
    },
    grid: { show: false }, // Oculta la cuadrícula
    dataLabels: { enabled: false },
    tooltip: {
      theme: "light",
      enabled: true,
      shared: true, // Agrupar los datos de todas las series
      intersect: false, // Mostrar tooltip cuando se pasa sobre cualquier parte
      followCursor: true, // Seguir el cursor
      style: {
        fontSize: "12px",
        fontFamily: "Helvetica, Arial, sans-serif",
        background: "#333",
        color: "#000",
      },
      y: {
        formatter: (val: number) => `$${val.toLocaleString()}`, // Formato para valores en el tooltip
      },
      marker: {
        show: true, // Mostrar marcador del tooltip
      },
    },
  };

  return (
    <AreaGraphDashboardContainer>
      <AreaGraphDashboardTitle>
        {numberToCurrency(series[0].data.reduce((acum: number, curr: number) => acum + curr, 0))}
      </AreaGraphDashboardTitle>
      <AreaGraphDashboardSubTitle>{title}</AreaGraphDashboardSubTitle>
      <Chart options={options} series={series} type="area" height={chartHeight} />
    </AreaGraphDashboardContainer>
  );
};
