import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);


export const options = {
  responsive: true,
  tooltips: {
    enabled: false
  },
  legend: {
    display: false
  },
  events: []
};

export const data = {
  datasets: [
    {
      data: [3, 2, 2, 3, 2, 2, 2, 2, 2, 2, 2, 2,],
      backgroundColor: [
        '#1C407B',
        '#1C407B',
        '#1C407B',
        '#1C407B',
        '#1C407B',
        '#1C407B',
      ],
      borderColor: [
        '#d6d6d6',
        '#d6d6d6',
        '#d6d6d6',
        '#d6d6d6',
        '#d6d6d6',
        '#d6d6d6',
      ],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  return <Pie data={data} options={options} style={{ height: "772px" }} />;
}