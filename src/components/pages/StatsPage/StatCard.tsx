import { Accordion, AccordionDetails, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Spinner } from "../../ui/Spinner";
import { Expand as ExpandIcon } from "@mui/icons-material";
import { FullCenterBox, ColumnJustifyFlex } from "../../Components.styled";
import { SecondaryAccordionSummary } from "./Stats.styled";

interface StatCardProps {
  title: string;
  type: "pie" | "bar";
  categories: string[];
  series: number[];
  colors: string[];
  formatter: string;
  chartSelect: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  type,
  categories,
  series,
  colors,
  formatter,
  chartSelect,
}) => {
  const [chartReady, setChartReady] = useState<boolean>(false);

  useEffect(() => {
    setChartReady(false);
    setTimeout(() => {
      setChartReady(true);
    }, 1000);
  }, [chartSelect]);

  const options = {
    labels: categories,
    colors: colors,
    noData: {
      text: "No hay datos disponibles",
      align: "center" as const,
      verticalAlign: "middle" as const,
      style: {
        color: "red",
        fontSize: "16px",
      },
      offsetX: 0,
      offsetY: 0,
    },
    dataLabels: {
      enabled: true,
      formatter: function (
        value: number,
        { seriesIndex, w }: { seriesIndex: number; w: { globals: { seriesTotals: number[]; series: number[] } } }
      ): string {
        if (type === "pie") {
          const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
          const seriesValue = w.globals.series[seriesIndex] ?? 0; // Asegura que seriesValue sea un número
          return total ? ((seriesValue / total) * 100).toFixed(1) + "%" : "0%";
        } else {
          return formatter === "money"
            ? new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
                value
              )
            : value.toString();
        }
      },

      // formatter: function (value: number, { seriesIndex, w }: any) {
      //   if (type === "pie") {
      //     const total = w.globals.seriesTotals.reduce((a: number, b: number) => a + b, 0);
      //     return total ? ((w.globals.series[seriesIndex] / total) * 100).toFixed(1) + "%" : "0%";
      //   } else {
      //     return formatter === "money"
      //       ? new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(
      //           value
      //         )
      //       : value.toString();
      //   }
      // },
    },
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
      theme: "light",
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
  const isThereData =
    type === "pie" ? series.some((value) => value > 0) : Object.values(series).some((value) => value > 0);

  return (
    <Accordion sx={{ mb: 2, borderRadius: "10px" }}>
      <SecondaryAccordionSummary expandIcon={<ExpandIcon />}>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
      </SecondaryAccordionSummary>
      <AccordionDetails>
        <ColumnJustifyFlex>
          {!chartReady ? (
            <Spinner />
          ) : isThereData ? (
            <Chart options={options} series={formattedSeries} type={type} height={300} width="100%" />
          ) : (
            <FullCenterBox>
              <Typography variant="h5" margin={2}>
                No hay suficientes datos para generar una grafica
              </Typography>
            </FullCenterBox>
          )}
        </ColumnJustifyFlex>
      </AccordionDetails>
    </Accordion>
  );
};
