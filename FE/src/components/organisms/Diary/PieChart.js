import { Paper, Text, Group, Center, Box } from '@mantine/core';
import { Pie } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ pie_data }) => {
  const data = {
    labels: ['Carbs', 'Fat', 'Protein',],
    datasets: [
      {
        data: Object.values(pie_data),
        backgroundColor: ['#55BCC6', '#E65851', '#AC61BB', '#ffff8b', '#ffffb0', '#b2fab4'],
      },
    ],
    options: {
      plugins: {
        legend: {
          onClick: (evt) => {
            evt.preventDefault();
          }
        }
      }
    }
  };

  return <Pie data={data} />;
};

PieChart.propTypes = {
  pie_data: PropTypes.array.isRequired,
};


export default PieChart;
