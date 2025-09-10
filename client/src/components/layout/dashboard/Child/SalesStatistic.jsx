import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";
import data from "../../../../data.json";

const SalesStatistic = () => {
  // Extract sales data from data.json
  const salesData = data.salesChartData;
  
  // Create area chart options using data from JSON
  const chartOptions = {
    chart: {
      type: 'area',
      height: 264,
      toolbar: {
        show: false
      },
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth',
      width: 2,
      colors: salesData.chartData.colors
    },
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
        colorStops: [
          {
            offset: 0,
            color: salesData.chartData.colors[0],
            opacity: 0.4
          },
          {
            offset: 100,
            color: salesData.chartData.colors[0],
            opacity: 0.1
          }
        ]
      }
    },
    grid: {
      show: true,
      borderColor: '#E6E6E6',
      strokeDashArray: 3,
      position: 'back',
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      }
    },
    xaxis: {
      categories: salesData.chartData.categories,
      labels: {
        style: {
          colors: '#64748B',
          fontSize: '12px',
          fontWeight: 400
        }
      },
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false
      }
    },
    yaxis: {
      labels: {
        formatter: function (value) {
          return '$' + value.toFixed(0);
        },
        style: {
          colors: '#64748B',
          fontSize: '12px',
          fontWeight: 400
        }
      }
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      y: {
        formatter: function (value) {
          return '$' + value.toLocaleString();
        }
      }
    },
    colors: salesData.chartData.colors
  };

  // Chart series from data.json
  const chartSeries = salesData.chartData.series;

  return (
    <div className='col-xxl-6 col-xl-12'>
      <div className='card h-100'>
        <div className='card-body'>
          <div className='d-flex flex-wrap align-items-center justify-content-between'>
            <h6 className='text-lg mb-0'>{salesData.title}</h6>
            <select
              className='form-select bg-base form-select-sm w-auto'
              defaultValue='Yearly'
            >
              <option value='Yearly'>Yearly</option>
              <option value='Monthly'>Monthly</option>
              <option value='Weekly'>Weekly</option>
              <option value='Today'>Today</option>
            </select>
          </div>
          <div className='d-flex flex-wrap align-items-center gap-2 mt-8'>
            <h6 className='mb-0'>${salesData.totalAmount.toLocaleString()}</h6>
            <span className={`text-sm fw-semibold rounded-pill px-8 py-4 line-height-1 d-flex align-items-center gap-1 ${
              salesData.changeDirection === 'up' 
                ? 'bg-success-focus text-success-main border br-success' 
                : 'bg-danger-focus text-danger-main border br-danger'
            }`}>
              {salesData.changePercent}% 
              <Icon 
                icon={salesData.changeDirection === 'up' ? 'bxs:up-arrow' : 'bxs:down-arrow'} 
                className='text-xs' 
              />
            </span>
            <span className='text-xs fw-medium'>{salesData.dailyChange}</span>
          </div>
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type='area'
            height={264}
          />
        </div>
      </div>
    </div>
  );
};

export default SalesStatistic;