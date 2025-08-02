import { Box } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import fetcher from '../utils/fetcher';

const yTicks = [0, 1000, 5000, 10000, 25000, 50000, 100000, 300000];

const MonthlyGraph = () => {
  const [data, setData] = useState(null);


  useEffect(() => {
    fetcher('/api/transactions/month_income')
      .then((response) => response.json())
      .then((fetchedData) => {
        if (fetchedData && Array.isArray(fetchedData.month)) {
          const processedData = fetchedData.month.map((item) => ({
            month: item.month,
            fullAmount: item.full_amount || 0,
          }))
          setData(processedData);
        }
      })
      .catch((error) => {
        console.error('Error fetching income data:', error);
      });
  }, []);

  if (!data) {
    return <Loader />;
  }

  return (
    <Box>
      {data && (
        <BarChart
          dataset={data}
          xAxis={[
            {
              scaleType: 'band',
              dataKey: 'month',
              valueFormatter: (month) => month,
            },
          ]}
          yAxis={[
            {
              ticks: yTicks,
              valueFormatter: (value) => `₹${value.toLocaleString()}`,
            },
          ]}
          series={[
            {
              dataKey: 'fullAmount',
              label: 'Monthly Income',
              valueFormatter: (value) => `₹${value.toLocaleString()}`,
              color: '#8D1838'
            },
          ]}
          height={350}
          grid={{ horizontal: true }}
          sx={{
            [`& .${axisClasses.left} .${axisClasses.label}`]: {
              transform: 'translateX(-10px)',
            },
          }}
        />
      )}
    </Box>
  );
};

export default MonthlyGraph;
