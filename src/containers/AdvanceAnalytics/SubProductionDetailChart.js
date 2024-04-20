import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const SubProductionChart = ({
  selectRange,
  prodResult,
  startDate,
  endDate,
  inputValues,
}) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    const ctx = chartContainer.current.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: selectRange.length
          ? selectRange.map((obj) => obj.label)
          : [],
        datasets: [
          {
            label: "Produced Pair in nos", // Name the series
            data: prodResult.length ? prodResult.map((e) => e.produced_pair_in_nos) : [], // Specify the data values array
            fill: false,
            borderColor: "#E31E24", // Add custom color border (Line)
            backgroundColor: "#E31E24", // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
          {
            label: "Cum - Prod Pairs Till Month1", // Name the series
            data: prodResult.length
              ? prodResult.map((e) => e.cum_prods_till_month_1)
              : [], // Specify the data values array
            fill: false,
            borderColor: "#1C407B", // Add custom color border (Line)
            backgroundColor: "#1C407B", // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
          {
            label: "Target", // Name the series
            data: prodResult.length ? inputValues : [], // Specify the data values array
            fill: false,
            borderColor: "#F6E163", // Add custom color border (Line)
            backgroundColor: "#F6E163", // Add custom color background (Points and Fill)
            borderWidth: 1, // Specify bar border width
          },
        ],
      },
      options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        scales: {
          y: {
            beginAtZero: true,
            title: {
              display: true,
              text: "Qty in Nos",
              font: {
                size: 17,
                weight: "bold",
              },
              color: "#001323",
            },
            ticks: {
              font: {
                size: 12,
              },
              color: "#001323",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              font: {
                size: 14,
              },
              color: "#001323",
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      myChart.destroy();
    };
  }, [selectRange, prodResult, startDate, endDate, inputValues]);

  return (
    <div
      className="col-lg-12"
      style={{ width: "100%", height: "440px", padding: "30px" }}
    >
      <canvas ref={chartContainer} id="myChart"></canvas>
    </div>
  );
};

export default SubProductionChart;
