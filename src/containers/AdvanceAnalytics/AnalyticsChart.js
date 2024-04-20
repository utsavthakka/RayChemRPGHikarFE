import React, { useEffect, useMemo, useState, useRef } from "react";
import Chart from "chart.js/auto";
import { cubejsApi } from "../../cubejs/CubeJsApi";

const AnalyticsChart = ({ selectRange, prodResult, startDate, endDate, qualityResult }) => {

  const [analyticsResult, setAnalyticsResult] = useState({
    Tested: [],
    Accepted: [],
  })

  console.log("analyticsResult",analyticsResult)
  useEffect(() => {
    handleAnalyticsCubeData();

    console.log("selectRange",selectRange)
    console.log("prodResult",prodResult)
    console.log("startDate",startDate)
    console.log("endDate",endDate)
  }, [startDate, endDate]);

  const handleAnalyticsCubeData = async () => {
    if (startDate && endDate) {
      const TestedAnalyticsResult = await cubejsApi.load({
        "measures": [
          "GlovesTrackingGlovestracking.VisualInspectionTotal"
        ],
        "timeDimensions": [
          {
            "dimension": "GlovesTrackingGlovestracking.createdAtMonth",
            "granularity": "month",
            "dateRange": [`${startDate}`, `${endDate}`]
          }
        ]
      })

      const AcceptedAnalyticsResult = await cubejsApi.load({

        "measures": [
          "GlovesTrackingGlovestracking.VisualInspectionAccepted"
        ],
        "timeDimensions": [
          {
            "dimension": "GlovesTrackingGlovestracking.createdAtMonth",
            "granularity": "month",
            "dateRange": [`${startDate}`, `${endDate}`]
          }
        ],

      })

      const TestedAnalyticArray = TestedAnalyticsResult.loadResponses[0].data.map((e, i) =>  e["GlovesTrackingGlovestracking.VisualInspectionTotal"] )

      

      const AcceptedAnalyticArray = AcceptedAnalyticsResult.loadResponses[0].data.map((e, i) => e["GlovesTrackingGlovestracking.VisualInspectionAccepted"])


      setAnalyticsResult({
        Tested: TestedAnalyticArray,
        Accepted: AcceptedAnalyticArray
      });

    }
  }

  const chartContainer = useRef(null);
  useEffect(() => {
    const ctx = chartContainer.current.getContext("2d");
    var myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: selectRange.length
          ? [""].concat(selectRange.map((obj) => obj.label))
          : [],
        datasets: [
          {
            label: 'Accepted',
            backgroundColor: '#1C407B',
            borderRadius: {
              topLeft: 4,
              topRight: 4,
              bottomLeft: 0,
              bottomRight: 0,
            },
            data: ["0"].concat(analyticsResult.Accepted),
          },
          {
            label: 'Tested',
            backgroundColor: '#DCE1EA',
            borderRadius: {
              topLeft: 4,
              topRight: 4,
              bottomLeft: 0,
              bottomRight: 0,
            },
            data: ["0"].concat(analyticsResult.Tested)
          },

        ],
      },
      options: {
        responsive: true, // Instruct chart js to respond nicely.
        maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height
        scales: {
          y: {
            stacked: true,
            beginAtZero: true,
            title: {
              display: true,
              text: "Monthly Qty in Pairs/Month",
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
            stacked: true,
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
  }, [analyticsResult]);

  return (
        <div className="col-lg-12 analyticschart" style={{ width: "100%",padding: "30px",height: "630px"}} >
            <canvas ref={chartContainer} id="myChart"></canvas>
        </div>
    )
};

export default AnalyticsChart;

