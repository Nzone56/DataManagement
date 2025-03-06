export interface multiSeries {
  name: string;
  type: string;
  data: number[];
}

export const getTableOptions = (
  categories: string[],
  type: "pie" | "bar" | "bar-line",
  formatter: string,
  colors: string[],
  series: number[] | multiSeries[]
) => {
  return {
    series: series,
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
};
