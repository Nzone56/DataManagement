import { Accordion, AccordionDetails, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import { Spinner } from "../../ui/Spinner";
import { Expand as ExpandIcon } from "@mui/icons-material";
import { FullCenterBox, ColumnJustifyFlex } from "../../Components.styled";
import { SecondaryAccordionSummary } from "./Stats.styled";
import { getTableOptions, multiSeries } from "../../../utils/getTableOptions";

interface StatCardProps {
  title: string;
  type: "pie" | "bar" | "bar-line";
  categories: string[];
  series: number[] | multiSeries[];
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
  const options = getTableOptions(categories, type, formatter, colors, series);
  useEffect(() => {
    setChartReady(false);
    setTimeout(() => {
      setChartReady(true);
    }, 1000);
  }, [chartSelect]);

  const formattedSeries =
    type === "pie"
      ? (series as number[]) // Pie requiere un array de números
      : type === "bar-line"
      ? (series as ApexAxisChartSeries) // Bar-line necesita una estructura con { name, type, data }
      : [{ name: "Total", data: series as number[] }]; // Bar requiere un array de objetos
  console.log(typeof series === "object");
  const isThereData =
    type === "pie"
      ? series.some((value) => Number(value) > 0)
      : type === "bar"
      ? Object.values(series).some((value) => value > 0)
      : (series as multiSeries[]).some((serie) => serie.data.some((value) => value > 0));

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
            <Chart
              options={options}
              series={formattedSeries}
              type={type === "bar-line" ? "line" : type}
              height={300}
              width="100%"
            />
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
