
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,

} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  // Tooltip,
  // Legend
);

export const options = {
  responsive: true,
  scales:{
    x: {
      grid: {
        display: false,
        }
    },
    y: {
      grid: {
        display: false,
      }
    },
    x: {
      display: false,
    },
  }
    
}
const labels = ['class 00', 'class 0', 'class 1', 'class 2', 'class 3', 'class 4'];

export const data = {
  labels,
  datasets: [
    {
      data: labels.map(() => faker.datatype.number({ min:0, max: 900 })),
      backgroundColor: "#A9B0BD",
    },
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 900 })),
      backgroundColor: '#00AB66',
    },
    {
      data: labels.map(() => faker.datatype.number({ min: 0, max: 900 })),
      backgroundColor: '#1C407B',
    },
  ],
};

export function DispatchSummaryChart() {
  return <Bar options={options} data={data} />;
}
