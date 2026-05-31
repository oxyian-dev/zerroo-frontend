import React, { useEffect, useState } from 'react';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { BarChart } from '@mui/x-charts/BarChart';
import fetcher from '../utils/fetcher';
import { Box, Typography } from '@mui/material';

const yTicks = [0, 1000, 5000, 10000, 25000, 50000, 100000, 300000];

const getLastFourTuesdays = () => {
    const now = new Date();
    const tuesdays = [];
    let day = now.getDay();
    let date = now.getDate();
    let offset = day >= 2 ? day - 2 : 7 - (2 - day);

    for (let i = 0; i < 4; i++) {
        const tuesday = new Date(now);
        tuesday.setDate(date - offset - i * 7);
        tuesdays.push(tuesday.toISOString().slice(0, 10));
    }
    return tuesdays.reverse();
};

const CutoffGraph = () => {
    const [data, setData] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetcher('/api/transactions/income?filterColumn=Type&filterOperator=not&filterValue=Payout')
            .then((response) => response.json())
            .then((fetchedData) => {
                if (!fetchedData || !fetchedData.rows || fetchedData.rows.length === 0) {
                    setErrorMessage("To unlock and view the income graph, you have to earn!");
                    setData([]);
                } else {
                    const processedData = fetchedData.rows
                        .map((item) => ({
                            date: item['Time'],
                            fullAmount: item['Full Amount'],
                        }))
                        .sort((a, b) => new Date(a.date) - new Date(b.date));

                    setData(processedData);
                }
            })
            .catch((error) => {
                console.error('Error fetching income data:', error);
                setErrorMessage("To unlock and view the income graph, you have to earn!");
            });
    }, []);

    return (
        <Box>
            <Typography
                variant="subtitle2"
                sx={{
                    color: 'rgba(255,255,255,.68)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    fontWeight: 700,
                    mb: 1
                }}
            >
                Qualification + 1:1 Pair Income Timeline
            </Typography>
            <Typography
                variant="body2"
                sx={{
                    color: 'rgba(255,255,255,.48)',
                    mb: 2
                }}
            >
                This chart shows qualification and 1:1 pair income entries over time.
            </Typography>
            {errorMessage ? (
                <Typography variant="h6" align="center" color="error">
                    {errorMessage}
                </Typography>
            ) : data && data.length > 0 ? (
                <BarChart
                    dataset={data}
                    xAxis={[
                        {
                            scaleType: 'band',
                            label: 'Cutoff Date',
                            dataKey: 'date',
                            ticks: getLastFourTuesdays(),
                            valueFormatter: (date) =>
                                `${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`,
                        },
                    ]}
                    yAxis={[
                        {
                            ticks: yTicks,
                            valueFormatter: (value) => `₹${value ? value.toLocaleString() : 0}`,
                        },
                    ]}
                    series={[
                        {
                            dataKey: 'fullAmount',
                            label: 'QUALIFICATION + 1:1 PAIR INCOME',
                            valueFormatter: (value) => `₹${value ? value.toLocaleString() : 0}`,
                            color: '#8D1838',
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
            ) : (
                <Typography variant="h6" align="center" color="error">
                    To unlock and view the income graph, you have to earn!
                </Typography>
            )}
        </Box>
    );
};

export default CutoffGraph;
