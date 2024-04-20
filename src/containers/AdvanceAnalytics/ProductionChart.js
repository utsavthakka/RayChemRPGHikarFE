import { Chart } from "chart.js";
import { useEffect, useRef, useState } from "react";
import "./Analytics.css";

const ProductionChart = ({
  productionData,
  productionData1,
  productionData2,
  productionData3,
  productionData4,
  productionData5,
  startDate,
  endDate,
  targetData,
}) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    var barChartData = {
      labels: [
        "Class 00",
        "Class 0",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
      ],
      datasets: [
        {
          label: "Target",
          backgroundColor: "#F6E163",
          borderColor: "#F6E163",
          borderWidth: 1,
          data: [
            targetData.class_00,
            targetData.class_0,
            targetData.class_1,
            targetData.class_2,
            targetData.class_3,
            targetData.class_4,
          ],
        },
        {
          label: "Produced",
          backgroundColor: "#1C407B",
          borderColor: "#1C407B",
          borderWidth: 1,
          data:
            startDate && endDate
              ? [
                  productionData.produce,
                  productionData1.produce,
                  productionData2.produce,
                  productionData3.produce,
                  productionData4.produce,
                  productionData5.produce,
                ]
              : [],
        },
        {
          label: "Accepted",
          backgroundColor: "#00AB66",
          borderColor: "#00AB66",
          borderWidth: 1,
          data:
            startDate && endDate
              ? [
                  productionData.passed,
                  productionData1.passed,
                  productionData2.passed,
                  productionData3.passed,
                  productionData4.passed,
                  productionData5.passed,
                ]
              : [],
        },
        {
          label: "Rejected",
          backgroundColor: "#E31E24",
          borderColor: "#E31E24",
          borderWidth: 1,
          data:
            startDate && endDate
              ? [
                  productionData.rejected,
                  productionData1.rejected,
                  productionData2.rejected,
                  productionData3.rejected,
                  productionData4.rejected,
                  productionData5.rejected,
                ]
              : [],
        },
      ],
    };

    var chartOptions = {
      maintainAspectRatio: false, // set this to false
      responsive: true,
      // legend: {
      //   position: "top"
      // },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
      plugins: {
        legend: {
          display: false,
        },
      },
      layout: {},
      x: {
        layout: {
          padding: {
            left: 40,
          },
        },
      },

      scales: {
        y: {
          title: {
            display: true,
            text: "Qty in Nos",
            font: {
              size: 17,
              weight: "bold",
            },
            color: "#001323",
          },
          grid: {
            display: false,
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

        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Number of items",
            },
          },
        ],
      },
    };

    const ctx = chartContainer.current.getContext("2d");
    const chart = new Chart(ctx, {
      type: "bar",
      data: barChartData,
      options: chartOptions,
    });

    return () => {
      chart.destroy();
    };
  }, [
    productionData,
    productionData1,
    productionData2,
    productionData3,
    productionData4,
    productionData5,
    startDate,
    endDate,
    targetData,
  ]);

  return (
    <>
      {startDate && endDate && (
        <>
          <div class="tooltip-container tool1">
            <span class="tooltiptext">
              {isNaN((100 * productionData.passed) / productionData.produce)
                ? "-"
                : (
                    (100 * productionData.passed) /
                    productionData.produce
                  ).toFixed(2) == "Infinity"
                ? 0
                : (
                    (100 * productionData.passed) /
                    productionData.produce
                  ).toFixed(2)}
              % Yield
            </span>
          </div>
          <div class="tooltip-container tool2">
            <span class="tooltiptext">
              {isNaN((100 * productionData1.passed) / productionData1.produce)
                ? "-"
                : (
                    (100 * productionData1.passed) /
                    productionData1.produce
                  ).toFixed(2) == "Infinity"
                ? 0
                : (
                    (100 * productionData1.passed) /
                    productionData1.produce
                  ).toFixed(2)}
              % Yield
            </span>
          </div>
          <div class="tooltip-container tool3">
            <span class="tooltiptext">
              {isNaN((100 * productionData2.passed) / productionData2.produce)
                ? "-"
                : (
                    (100 * productionData2.passed) /
                    productionData2.produce
                  ).toFixed(2) == "Infinity"
                ? 0
                : (
                    (100 * productionData2.passed) /
                    productionData2.produce
                  ).toFixed(2)}
              % Yield
            </span>
          </div>
          <div class="tooltip-container tool4">
            <span class="tooltiptext">
              {isNaN((100 * productionData3.passed) / productionData3.produce)
                ? "-"
                : (
                    (100 * productionData3.passed) /
                    productionData3.produce
                  ).toFixed(2) == "Infinity"
                ? 0
                : (
                    (100 * productionData3.passed) /
                    productionData3.produce
                  ).toFixed(2)}
              % Yield
            </span>
          </div>
          <div class="tooltip-container tool5">
            <span class="tooltiptext">
              {isNaN((100 * productionData4.passed) / productionData4.produce)
                ? "-"
                : (
                    (100 * productionData4.passed) /
                    productionData4.produce
                  ).toFixed(2) == "Infinity"
                ? 0
                : (
                    (100 * productionData4.passed) /
                    productionData4.produce
                  ).toFixed(2)}
              % Yield
            </span>
          </div>
          <div class="tooltip-container tool6">
            <span class="tooltiptext">
              {isNaN((100 * productionData5.passed) / productionData5.produce)
                ? "-"
                : (
                    (100 * productionData5.passed) /
                    productionData5.produce
                  ).toFixed(2) == "Infinity"
                ? 0
                : (
                    (100 * productionData5.passed) /
                    productionData5.produce
                  ).toFixed(2)}
              % Yield
            </span>
          </div>
        </>
      )}
      <div style={{ width: "100%", height: "392px", padding: "30px" }}>
        <canvas ref={chartContainer} id="canvas"></canvas>
      </div>
    </>
  );
};
export default ProductionChart;
