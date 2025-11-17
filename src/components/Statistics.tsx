import type React from "react";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';
import _ from 'lodash';
import { fetchTrainingsWithCustomer } from "../trainingapi";
import type { TrainingWithCustomer, ActivityStat } from "../types";

Chart.register(...registerables);



function Statistics() {
  const [trainings, setTrainings] = useState<TrainingWithCustomer[]>([]);
  
  useEffect(() => {
    fetchTrainingsWithCustomer()
      .then(data => setTrainings(data))
      .catch(err => console.error(err));
  }, []);

  const grouped = _.groupBy(trainings, 'activity');
  
  const stats: ActivityStat[] = _.map(grouped, (items, activity) => ({
    activity,
    totalMinutes: _.sumBy(items, 'duration')
  }));

  const chartData = {
    labels: stats.map((stat: ActivityStat) => stat.activity),
    datasets: [{
      label: 'Minutes',
      data: stats.map((stat: ActivityStat) => stat.totalMinutes),
      backgroundColor: '#19d2adff',
      borderColor: '#19d2adff',
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Training Minutes by Activity'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Minutes'
        }
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Statistics</h1>
      <div style={{ height: '500px', maxWidth: '800px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}

export default Statistics;