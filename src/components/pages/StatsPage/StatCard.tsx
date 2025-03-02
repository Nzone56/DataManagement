import { Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Spinner } from "../../ui/spinner";

interface StatCardProps {
  title: string;
  type: "pie" | "bar";
  categories: string[];
  series: number[];
  colors: string[];
  formatter: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, type, categories, series, colors, formatter }) => {
  const [chartReady, setChartReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setChartReady(true);
    }, 1000);
  }, []);

  // const options = {
  //   chart: { type },
  //   xaxis: type === "bar" ? { categories } : undefined,
  //   labels: type === "pie" ? categories : undefined,
  // };

  const options = {
    labels: categories,
    colors: colors,
    yaxis: {
      labels: {
        formatter: function (value: number) {
          if (formatter === "money") {
            return new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(value);
          } else {
            return value.toString();
          }
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value: number) {
          if (formatter === "money") {
            return new Intl.NumberFormat("es-CO", {
              style: "currency",
              currency: "COP",
              maximumFractionDigits: 0,
            }).format(value);
          } else {
            return value.toString();
          }
        },
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "45%",
        distributed: true,
      },
    },
  };

  // console.log(
  //   series,
  //   categories,
  //   series.map((serie, index) => ({ name: categories[index], data: serie }))
  // );

  const formattedSeries = type === "pie" ? series : [{ name: "Total", data: series }];

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{title}</Typography>
        {!chartReady ? (
          <Spinner />
        ) : (
          <Chart options={options} series={formattedSeries} type={type} height={300} width="100%" />
        )}
      </CardContent>
    </Card>
  );
};
