import { useState, useEffect } from 'react';
import data from '../../../data.json';

const useReactApexChart = (chartType = 'default') => {
  // Get data from JSON based on chart type

  const salesData = data.salesChartData;

  const [chartData, setChartData] = useState({
    chartOptions: {
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
    },
    chartSeries: salesData.chartData.series
  });

  // Bar Chart Configuration for TotalSubscriber
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
      colors: ['#FF6B6B']
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
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
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
    colors: ['#FF6B6B']
  };

  const barChartSeries = [
    {
      name: 'Subscribers',
      data: [800, 1200, 900, 1500, 1100, 1800]
    }
  ];

  return {
    chartOptions: chartData.chartOptions,
    chartSeries: chartData.chartSeries,
    barChartOptions,
    barChartSeries
  };
};

export default useReactApexChart;
