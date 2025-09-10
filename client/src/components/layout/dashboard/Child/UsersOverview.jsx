import ReactApexChart from "react-apexcharts";
import data from "../../../../data.json";

const UsersOverview = () => {
  // Extract users overview data from data.json
  const usersData = data.usersOverviewData;
  
  // Create donut chart options using data from JSON
  const donutChartOptions = {
    chart: {
      type: 'donut',
      height: 264,
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      pie: {
        donut: {
          size: '65%',
          labels: {
            show: true,
            name: {
              show: true,
              fontSize: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              color: '#374151',
              offsetY: -10
            },
            value: {
              show: true,
              fontSize: '24px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 700,
              color: '#111827',
              offsetY: 10,
              formatter: function (val) {
                return val;
              }
            },
            total: {
              show: true,
              showAlways: true,
              label: 'Total Users',
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
              color: '#6B7280',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {
                  return a + b;
                }, 0);
              }
            }
          }
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ],
    legend: {
      show: false
    },
    colors: usersData.chartData.colors,
    stroke: {
      width: 0
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      style: {
        fontSize: '12px',
        fontFamily: 'Inter, sans-serif'
      },
      y: {
        formatter: function (val) {
          return val + ' users';
        }
      }
    },
    labels: usersData.chartData.labels
  };

  // Chart series from data.json
  const donutChartSeries = usersData.chartData.series;

  return (
    <div className='col-xxl-3 col-xl-6'>
      <div className='card h-100 radius-8 border-0 overflow-hidden'>
        <div className='card-body p-24'>
          <div className='d-flex align-items-center flex-wrap gap-2 justify-content-between'>
            <h6 className='mb-2 fw-bold text-lg'>{usersData.title}</h6>
            <div className=''>
              <select
                className='form-select form-select-sm w-auto bg-base border text-secondary-light'
                defaultValue='Today'
              >
                <option value='Today'>Today</option>
                <option value='Weekly'>Weekly</option>
                <option value='Monthly'>Monthly</option>
                <option value='Yearly'>Yearly</option>
              </select>
            </div>
          </div>
          <ReactApexChart
            options={donutChartOptions}
            series={donutChartSeries}
            type='donut'
            height={264}
          />
          <ul className='d-flex flex-wrap align-items-center justify-content-between mt-3 gap-3'>
            {usersData.chartData.labels.map((label, index) => (
              <li key={index} className='d-flex align-items-center gap-2'>
                <span 
                  className='w-12-px h-12-px radius-2' 
                  style={{ backgroundColor: usersData.chartData.colors[index] }}
                />
                <span className='text-secondary-light text-sm fw-normal'>
                  {label}:
                  <span className='text-primary-light fw-semibold'>
                    {donutChartSeries[index]}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UsersOverview;