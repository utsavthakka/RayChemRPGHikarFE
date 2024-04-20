import { Chart } from "chart.js";
import { useEffect, useRef} from "react";
import "./Analytics.css";

const SalesChart = ({ salesData, startDate, endDate }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    var barChartData = {
      labels: [
        "Class 0",
        "Class 00",
        "Class 1",
        "Class 2",
        "Class 3",
        "Class 4",
      ],
      datasets: [
        {
          label: "Export",
          backgroundColor: "#A9B0BD",
          borderColor: "#A9B0BD",
          borderWidth: 1,
          data:
            startDate && endDate
              ? [
                  parseFloat(
                    salesData.salesExportClassValue00.loadResponses
                      ? (
                          salesData.salesExportClassValue00.loadResponses[0]
                            .data[0]["HomeOpenorders.totalOrderPriceSum"] /
                          100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.salesExportClassValue0.loadResponses
                      ? (
                          salesData.salesExportClassValue0.loadResponses[0]
                            .data[0]["HomeOpenorders.totalOrderPriceSum"] /
                          100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.salesExportClassValue1.loadResponses
                      ? (
                          salesData.salesExportClassValue1.loadResponses[0]
                            .data[0]["HomeOpenorders.totalOrderPriceSum"] /
                          100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.salesExportClassValue2.loadResponses
                      ? (
                          salesData.salesExportClassValue2.loadResponses[0]
                            .data[0]["HomeOpenorders.totalOrderPriceSum"] /
                          100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.salesExportClassValue3.loadResponses
                      ? (
                          salesData.salesExportClassValue3.loadResponses[0]
                            .data[0]["HomeOpenorders.totalOrderPriceSum"] /
                          100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.salesExportClassValue4.loadResponses
                      ? (
                          salesData.salesExportClassValue4.loadResponses[0]
                            .data[0]["HomeOpenorders.totalOrderPriceSum"] /
                          100000
                        ).toFixed(2)
                      : 0
                  ),
                ]
              : [],
        },
        {
          label: "Domestic",
          backgroundColor: "#00AB66",
          borderColor: "#00AB66",
          borderWidth: 1,
          data:
            startDate && endDate
              ? [
                  parseFloat(
                    salesData.saleClassValue00.loadResponses
                      ? (
                          salesData.saleClassValue00.loadResponses[0].data[0][
                            "HomeOpenorders.totalOrderPriceSum"
                          ] / 100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.saleClassValue0.loadResponses
                      ? (
                          salesData.saleClassValue0.loadResponses[0].data[0][
                            "HomeOpenorders.totalOrderPriceSum"
                          ] / 100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.saleClassValue1.loadResponses
                      ? (
                          salesData.saleClassValue1.loadResponses[0].data[0][
                            "HomeOpenorders.totalOrderPriceSum"
                          ] / 100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.saleClassValue2.loadResponses
                      ? (
                          salesData.saleClassValue2.loadResponses[0].data[0][
                            "HomeOpenorders.totalOrderPriceSum"
                          ] / 100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.saleClassValue3.loadResponses
                      ? (
                          salesData.saleClassValue3.loadResponses[0].data[0][
                            "HomeOpenorders.totalOrderPriceSum"
                          ] / 100000
                        ).toFixed(2)
                      : 0
                  ),
                  parseFloat(
                    salesData.saleClassValue4.loadResponses
                      ? (
                          salesData.saleClassValue4.loadResponses[0].data[0][
                            "HomeOpenorders.totalOrderPriceSum"
                          ] / 100000
                        ).toFixed(2)
                      : 0
                  ),
                ]
              : [],
        },
        {
          label: "Total",
          backgroundColor: "#1C407B",
          borderColor: "#1C407B",
          borderWidth: 1,
          data:
            startDate && endDate
              ? [
                  ((parseFloat(
                    salesData.salesExportClassValue00.loadResponses &&
                      salesData.salesExportClassValue00.loadResponses.length >
                        0 &&
                      salesData.salesExportClassValue00.loadResponses[0]
                        .data[0]["HomeOpenorders.totalOrderPriceSum"]
                  ) +
                    parseFloat(
                      salesData.saleClassValue00.loadResponses &&
                        salesData.saleClassValue00.loadResponses.length > 0 &&
                        salesData.saleClassValue00.loadResponses[0].data[0][
                          "HomeOpenorders.totalOrderPriceSum"
                        ]
                    )) /
                    100000).toFixed(2),

                  ((parseFloat(
                    salesData.salesExportClassValue0.loadResponses &&
                      salesData.salesExportClassValue0.loadResponses.length >
                        0 &&
                      salesData.salesExportClassValue0.loadResponses[0].data[0][
                        "HomeOpenorders.totalOrderPriceSum"
                      ]
                  ) +
                    parseFloat(
                      salesData.saleClassValue0.loadResponses &&
                        salesData.saleClassValue0.loadResponses.length > 0 &&
                        salesData.saleClassValue0.loadResponses[0].data[0][
                          "HomeOpenorders.totalOrderPriceSum"
                        ]
                    )) /
                    100000).toFixed(2),

                  ((parseFloat(
                    salesData.salesExportClassValue1.loadResponses &&
                      salesData.salesExportClassValue1.loadResponses.length >
                        0 &&
                      salesData.salesExportClassValue1.loadResponses[0].data[0][
                        "HomeOpenorders.totalOrderPriceSum"
                      ]
                  ) +
                    parseFloat(
                      salesData.saleClassValue1.loadResponses &&
                        salesData.saleClassValue1.loadResponses.length > 0 &&
                        salesData.saleClassValue1.loadResponses[0].data[0][
                          "HomeOpenorders.totalOrderPriceSum"
                        ]
                    ))/100000).toFixed(2),

                  ((parseFloat(
                    salesData.salesExportClassValue2.loadResponses &&
                      salesData.salesExportClassValue2.loadResponses.length >
                        0 &&
                      salesData.salesExportClassValue2.loadResponses[0].data[0][
                        "HomeOpenorders.totalOrderPriceSum"
                      ]
                  ) +
                    parseFloat(
                      salesData.saleClassValue2.loadResponses &&
                        salesData.saleClassValue2.loadResponses.length > 0 &&
                        salesData.saleClassValue2.loadResponses[0].data[0][
                          "HomeOpenorders.totalOrderPriceSum"
                        ]
                    ))/100000).toFixed(2),

                  ((parseFloat(
                    salesData.salesExportClassValue3.loadResponses &&
                      salesData.salesExportClassValue3.loadResponses.length >
                        0 &&
                      salesData.salesExportClassValue3.loadResponses[0].data[0][
                        "HomeOpenorders.totalOrderPriceSum"
                      ]
                  ) +
                    parseFloat(
                      salesData.saleClassValue3.loadResponses &&
                        salesData.saleClassValue3.loadResponses.length > 0 &&
                        salesData.saleClassValue3.loadResponses[0].data[0][
                          "HomeOpenorders.totalOrderPriceSum"
                        ]
                    ))/100000).toFixed(2),

                  ((parseFloat(
                    salesData.salesExportClassValue4.loadResponses &&
                      salesData.salesExportClassValue4.loadResponses.length >
                        0 &&
                      salesData.salesExportClassValue4.loadResponses[0].data[0][
                        "HomeOpenorders.totalOrderPriceSum"
                      ]
                  ) +
                    parseFloat(
                      salesData.saleClassValue4.loadResponses &&
                        salesData.saleClassValue4.loadResponses.length > 0 &&
                        salesData.saleClassValue4.loadResponses[0].data[0][
                          "HomeOpenorders.totalOrderPriceSum"
                        ]
                    ))/100000).toFixed(2),
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
            text: "Lakhs",
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
  }, [salesData, startDate, endDate]);

  return (
    <>
      <div style={{ width: "100%", height: "392px", padding: "30px" }}>
        <canvas ref={chartContainer} id="canvas"></canvas>
      </div>
    </>
  );
};
export default SalesChart;
