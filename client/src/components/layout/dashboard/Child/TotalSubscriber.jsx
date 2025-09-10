import { Icon } from "@iconify/react/dist/iconify.js";
import ReactApexChart from "react-apexcharts";
import data from "../../../../data.json";

const TotalSubscriber = () => {
  // Extract subscriber data from data.json
  const subscriberData = data.subscriberChartData;
  
  // Create bar chart options using data from JSON
  const barChartOptions = {
    chart: {
      type: 'bar',
      height: 264,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%',
        borderRadius: 4,
        borderRadiusApplication: 'end'
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    fill: {
      opacity: 1,
      colors: subscriberData.chartData.colors
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
      categories: subscriberData.chartData.categories,
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
          return value.toFixed(0);
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
          return value.toLocaleString() + ' subscribers';
        }
      }
    },
    colors: subscriberData.chartData.colors
  };

  // Chart series from data.json
  const barChartSeries = subscriberData.chartData.series;

  return (
    <div className='col-xxl-3 col-xl-6'>
      <div className='card h-100 radius-8 border'>
        <div className='card-body p-24'>
          <h6 className='mb-12 fw-semibold text-lg mb-16'>
            {subscriberData.title}
          </h6>
          <div className='d-flex align-items-center gap-2 mb-20'>
            <h6 className='fw-semibold mb-0'>
              {subscriberData.totalCount.toLocaleString()}
            </h6>
            <p className='text-sm mb-0'>
              <span className={`bg-danger-focus border br-danger px-8 py-2 rounded-pill fw-semibold text-danger-main text-sm d-inline-flex align-items-center gap-1 ${
                subscriberData.changeDirection === 'up' 
                  ? 'bg-success-focus text-success-main border br-success' 
                  : 'bg-danger-focus text-danger-main border br-danger'
              }`}>
                {Math.abs(subscriberData.changePercent)}%
                <Icon 
                  icon={subscriberData.changeDirection === 'up' ? 'bxs:up-arrow' : 'iconamoon:arrow-down-2-fill'} 
                  className='icon' 
                />
              </span>
              {subscriberData.dailyChange}
            </p>
          </div>
          <ReactApexChart
            options={barChartOptions}
            series={barChartSeries}
            type='bar'
            height={264}
          />
        </div>
      </div>
    </div>
  );
};

export default TotalSubscriber;