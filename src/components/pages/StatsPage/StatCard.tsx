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
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isChartVisible, setIsChartVisible] = useState<boolean>(false);

  const options = getTableOptions(categories, type, formatter, colors, series);

  const formattedSeries =
    type === "pie"
      ? (series as number[])
      : type === "bar-line"
      ? (series as ApexAxisChartSeries)
      : [{ name: "Total", data: series as number[] }];

  const isThereData =
    type === "pie"
      ? series.some((value) => Number(value) > 0)
      : type === "bar"
      ? Object.values(series).some((value) => value > 0)
      : (series as multiSeries[]).some((serie) => serie.data.some((value) => value > 0));

  // Spinner when chartSelect changes or the graph render
  useEffect(() => {
    if (isExpanded) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500); // Spinner por 800ms
    }
  }, [chartSelect, isExpanded]);

  // Delya naimation when the accordion closes
  useEffect(() => {
    if (isExpanded) {
      setIsChartVisible(true);
    } else {
      setTimeout(() => setIsChartVisible(false), 300); // Wait 300ms before hidding the graph
    }
  }, [isExpanded]);

  return (
    <Accordion
      sx={{ mb: 2, borderRadius: "10px" }}
      expanded={isExpanded}
      onChange={() => setIsExpanded((prev) => !prev)}
    >
      <SecondaryAccordionSummary expandIcon={<ExpandIcon />}>
        <Typography variant="h5" fontWeight={500}>
          {title}
        </Typography>
      </SecondaryAccordionSummary>
      <AccordionDetails sx={{ overflowX: "auto" }}>
        {isChartVisible && (
          <ColumnJustifyFlex
            sx={{
              transition: "opacity 0.3s",
              opacity: isExpanded ? 1 : 0,
              minWidth: categories.length > 15 ? "200%" : "",
            }}
          >
            {isLoading ? (
              <Spinner />
            ) : isThereData ? (
              <Chart
                options={options}
                series={formattedSeries}
                type={type === "bar-line" ? "line" : type}
                height={type !== "pie" ? 400 : 300}
                width={categories.length > 15 ? "200%" : "100%"}
              />
            ) : (
              <FullCenterBox>
                <Typography variant="h5" margin={2}>
                  No hay suficientes datos para generar una gráfica
                </Typography>
              </FullCenterBox>
            )}
          </ColumnJustifyFlex>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
