import { Paper, Text, Center, Group, SegmentedControl } from '@mantine/core';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { meal_select_data } from '@/consts/select_choices';

const Graph = ({ historyType, setHistoryType, calorieHistory }) => {
  let width, height, gradient;
  const getGradient = (ctx, chartArea) => {
    const chartWidth = chartArea.right - chartArea.left;
    const chartHeight = chartArea.bottom - chartArea.top;
    if (!gradient || width !== chartWidth || height !== chartHeight) {
      width = chartWidth;
      height = chartHeight;
      gradient = ctx.createLinearGradient(
        0,
        chartArea.bottom,
        0,
        chartArea.top
      );
      gradient.addColorStop(1, 'rgba(178, 221, 145, 0.45)');
      gradient.addColorStop(0, 'rgba(178, 221, 145, 0)');
    }

    return gradient;
  };


  const getLabels = () => {
    if (historyType === 'day') {
      return meal_select_data;
    } else if (historyType === 'week') {
      return moment.weekdays();
    } else {
      return [...Array(moment().daysInMonth())].map((_, i) => {
        return `${moment(moment().month(), 'M').format('MMMM')} ${i + 1}`
      });
    }
  }

  const data = {
    labels: getLabels(),
    datasets: [
      {
        label: '%',
        data: calorieHistory?.dataset,
        backgroundColor: function (context) {
          const chart = context.chart;
          const { ctx, chartArea } = chart;

          if (!chartArea) {
            return;
          }
          return getGradient(ctx, chartArea);
        },
        borderColor: '#006C52',
        borderWidth: 4,
        tension: 0.5,
        pointRadius: 6,
        pointBackgroundColor: '#B2DD91',
        pointBorderWidth: 2,
        pointBorderColor: '#fff',
        fill: true,
      },
    ],
  };

  const getOrCreateTooltip = (chart) => {
    let tooltipEl = chart.canvas.parentNode.querySelector('div');

    if (!tooltipEl) {
      tooltipEl = document.createElement('div');
      const innerElem = document.createElement('div');
      innerElem.style.position = 'relative';

      tooltipEl.style.background = '#fff';
      tooltipEl.style.borderRadius = '10px';
      tooltipEl.style.color = '#00674C';
      tooltipEl.style.opacity = 1;
      tooltipEl.style.pointerEvents = 'none';
      tooltipEl.style.position = 'absolute';
      tooltipEl.style.transform = 'translate(-50%, 0)';
      tooltipEl.style.transition = 'all .1s ease';
      tooltipEl.style.marginLeft = '55px';
      tooltipEl.style.marginTop = '-18px';
      tooltipEl.style.fontSize = '12px';
      tooltipEl.style.boxShadow = '0px 5px 10px 0px rgba(0, 0, 0, 0.1)';

      const table = document.createElement('table');
      table.style.margin = '0px';

      tooltipEl.appendChild(table);
      chart.canvas.parentNode.appendChild(tooltipEl);
    }

    return tooltipEl;
  };

  const externalTooltipHandler = (context) => {
    // Tooltip Element
    const { chart, tooltip } = context;
    const tooltipEl = getOrCreateTooltip(chart);

    // Hide if no tooltip
    if (tooltip.opacity === 0) {
      tooltipEl.style.opacity = 0;
      return;
    }

    // Set Text
    if (tooltip.body) {
      const titleLines = tooltip.title || [];
      const bodyLines = tooltip.body.map((b) => b.lines);

      const tableHead = document.createElement('thead');
      const tr = document.createElement('tr');

      titleLines.forEach((title) => {
        tr.style.borderWidth = 0;

        const th = document.createElement('th');
        th.style.borderWidth = 0;

        const mDiv = document.createElement('div');
        mDiv.style.display = 'flex';
        mDiv.style.gap = '4px';

        const label = document.createElement('label');
        label.innerHTML = title;
        label.style.fontWeight = 400;

        const strong = document.createElement('strong');
        strong.innerHTML = ` : ${bodyLines[0]['0'].split('%: ')[1]}`;
        strong.style.fontWeight = 'bold';

        mDiv.appendChild(label);
        mDiv.appendChild(strong);

        th.appendChild(mDiv);
        tr.appendChild(th);
      });
      tableHead.appendChild(tr);

      const tableRoot = tooltipEl.querySelector('table');

      // Remove old children
      while (tableRoot.firstChild) {
        tableRoot.firstChild.remove();
      }

      // Add new children
      tableRoot.appendChild(tableHead);
      // tableRoot.appendChild(tableBody);
    }

    const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

    // Display, position, and set styles for font
    tooltipEl.style.opacity = 1;
    tooltipEl.style.left = positionX + tooltip.caretX + 'px';
    tooltipEl.style.top = positionY + tooltip.caretY + 'px';
    tooltipEl.style.font = tooltip.options.bodyFont.string;
    tooltipEl.style.padding =
      tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
  };

  const options = {
    interaction: {
      mode: 'index',
      intersect: false,
    },
    responsive: true,
    maintainAspectRatio: false,
    offset: true,
    hover: { mode: 'null' },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          color: '#575757',
          stepSize: 1000,
          padding: 20,
        },
        grid: {
          color: '#ECECF0',
          backgroundColor: 'white',
          borderColor: '#006C52',
          drawBorder: false,
          drawTicks: false,
        },
      },
      x: {
        ticks: {
          display: true,
        },
        grid: {
          display: false,
          backgroundColor: 'transparent',
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
      tooltip: {
        enabled: false,
        external: externalTooltipHandler,
      },
    },
  };

  const colors = [
    'rgba(241, 249, 241, 0.5)',
    'rgba(241, 249, 241, 0.5)',
    'rgba(241, 249, 241, 0.5)',
    'rgba(241, 249, 241, 0.5)',
    'rgba(241, 249, 241, 0.5)',
  ];

  const hoverBackgroundColors = {
    id: 'hoverBackgroundColors',
    beforeDatasetsDraw(chart) {
      const {
        ctx,
        tooltip,
        chartArea: { top, height },
        scales: { x },
      } = chart;

      if (tooltip._active[0]) {
        const index = tooltip._active[0].index;
        let newWidth;

        newWidth = x._gridLineItems[1].x1 - x._gridLineItems[2].x1;

        if (index === 0 || index === data.datasets[0].data?.length - 1) {
          newWidth = 0;
        }

        ctx.fillStyle = colors[index];
        const half = -newWidth / 2;
        ctx.fillRect(x._gridLineItems[index].x1 + half, top, newWidth, height);
      }
    },
  };

  const plugins = [hoverBackgroundColors];

  return (
    <Paper
      radius='lg'
      p='21px 47px 23px 28px'
      shadow='0px 40px 80px #EEF1F4'
      style={{ border: '1px sold #ECEFF4', height: 360 }}
    >
      <Group grow>
        <Text weight='bold' size='xl' pl={9}>
          Calorie History
        </Text>
        {JSON.stringify()}
        <Group position='right'>
          <SegmentedControl
            value={historyType}
            onChange={setHistoryType}
            data={[
              { label: 'Day', value: 'day' },
              { label: 'Week', value: 'week' },
              { label: 'Month', value: 'month' },
            ]}
            classNames={{
              controlActive: 'custom-white',
            }}
            styles={{
              label: { padding: '10px' },
              control: {
                minWidth: 85,
                border: '0 !important',
              },
              controlActive: {
                background: '#006C52',
              },
              labelActive: {
                color: '#fff !important',
              },
            }}
            sx={{ background: 'transparent', border: '1px solid #E6E6E6' }}
            radius={8}
          />
        </Group>
      </Group>
      <Center pt={22} style={{ height: '90%' }}>
        <Line plugins={plugins} data={data} options={options} />
      </Center>
    </Paper>
  );
};

export default Graph;
