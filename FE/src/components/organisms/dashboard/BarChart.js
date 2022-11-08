import { Text, Paper, Center, Loader } from '@mantine/core';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import moment from 'moment';

const BarChart = ({ trackedWater, loading }) => {
  const utcOffset = new Date().getTimezoneOffset() / 60;
  const data = {
    labels: trackedWater.map(item =>
      moment(item.created_at).utcOffset(utcOffset).format('hh:mm a')
    ),
    datasets: [
      {
        label: 'Oz',
        data: trackedWater.map(item => item.value),
        backgroundColor: '#B0DC90',
        borderRadius: 24,
        barThickness: 12,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    offset: true,
    scales: {
      y: {
        ticks: {
          color: '#8AB8AD',
          stepSize: 20,
          padding: 10,
        },
        grid: {
          color: '#2D937A',
          borderDash: [1, 5],
          backgroundColor: 'white',
          borderColor: '#006C52',
          drawBorder: false,
          drawTicks: false,
        },
        suggestedMax: Math.max(trackedWater.map(item => item.value ?? 0)),
      },
      x: {
        ticks: {
          display: false,
        },
        grid: {
          display: false,
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      titles: {
        display: false,
      },
      datalabels: {
        display: false,
      },
    },
  };

  return (
    <Paper
      radius='lg'
      p='21px 47px 23px 28px'
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4', background: '#006C52', height: 360 }}
    >
      <Text weight='bold' size='xl' color='white' pl={9}>
        Water Tracker
      </Text>
      {loading ? (
        <Center sx={{ height: '90%' }}>
          <Loader color='white' />
        </Center>
      ) : (
        <Center pt={22} style={{ height: '90%' }}>
          <Bar data={data} options={options} />
        </Center>
      )}
    </Paper>
  );
};

export default BarChart;
