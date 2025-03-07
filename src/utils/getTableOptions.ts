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
  //  Función para formatear números (dinero o valores normales)
  const formatNumber = (value: number) => {
    return formatter === "money"
      ? new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(value)
      : value.toString();
  };

  // Si hay muchas categorías, reducir la fuente y permitir scroll
  const isLargeCategorySet = categories.length > 15;

  return {
    series: series,
    labels: categories,
    colors: type === "bar-line" ? ["#008FFB", "#FF4560"] : colors,
    stroke: {
      width: type === "bar-line" ? [0, 4] : [4], // 0 para barras, 4 para líneas
    },
    markers: {
      size: type === "bar-line" ? [0, 5] : [5], // 0 para barras, 5 para línea
    },
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
          const seriesValue = w.globals.series[seriesIndex] ?? 0;
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
        formatter: formatNumber,
      },
    },
    tooltip: {
      theme: "light",
      x: {
        formatter: (_: number, opts: { dataPointIndex: number }) => categories[opts.dataPointIndex], // Muestra el nombre completo en el tooltip
      },
      y: {
        formatter: formatNumber,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "75%",
        distributed: type !== "bar-line",
      },
    },
    xaxis: {
      categories,
      labels: {
        formatter: (val: string) => (val?.length > 5 ? val.slice(0, 5) + "..." : val),
        style: {
          fontSize: "12px",
        },
        rotate: isLargeCategorySet ? -90 : 0,
      },
      tickPlacement: isLargeCategorySet ? "on" : "between",
    },
    chart: {
      toolbar: {
        show: true,
      },
      zoom: {
        enabled: isLargeCategorySet,
      },
    },
  };
};
