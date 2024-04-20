

import { Chart } from "chart.js";
import { useEffect, useRef } from "react";
import "./Analytics.css";

const VisualClassChart = ({ qualityResult, startDate, endDate, }) => {
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
          label: "Tested",
          backgroundColor: "#A9B0BD",
          borderColor: "#A9B0BD",
          borderWidth: 1,
          data: [
            qualityResult.Testedv1,
            qualityResult.Testedv2,
            qualityResult.Testedv3,
            qualityResult.Testedv4,
            qualityResult.Testedv5,
            qualityResult.Testedv6,
          ]
        },
        {
          label: "Accepted",
          backgroundColor: "#00AB66",
          borderColor: "#00AB66",
          borderWidth: 1,
          data: [
            qualityResult.Acceptedv1,
            qualityResult.Acceptedv2,
            qualityResult.Acceptedv3,
            qualityResult.Acceptedv4,
            qualityResult.Acceptedv5,
            qualityResult.Acceptedv6,
          ],
        },
        {
          label: "Rejected",
          backgroundColor: "#E31E24",
          borderColor: "#E31E24",
          borderWidth: 1,
          data: [
            qualityResult.Rejectedv1,
             qualityResult.Rejectedv2,
             qualityResult.Rejectedv3,
             qualityResult.Rejectedv4,
             qualityResult.Rejectedv5,
             qualityResult.Rejectedv6,
          ],
        },
      ],
    };

    var chartOptions = {
      maintainAspectRatio: false, // set this to false
      responsive: true,
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
  }, [qualityResult, startDate, endDate]);

  return (
    <>
  
      <div style={{ width: "100%", height: "392px", padding: "30px" }}>
        <canvas ref={chartContainer} id="canvas"></canvas>
      </div>
    </>
  );
};
export default VisualClassChart;
