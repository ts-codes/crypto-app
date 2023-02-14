import React, { useContext } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS } from 'chart.js/auto';
import { useState } from 'react';
import { useEffect } from 'react';
import { CryptoContext } from '../context/cryptoContext';

const Chart = ({ chartData, numDays }) => {
    const { selectedCurrency } = useContext(CryptoContext);
    const timestamp = function () {
        if (numDays === '1') {
            return chartData?.map((index) =>
                new Date(index[0]).toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                })
            );
        } else {
            return chartData?.map((index) =>
                new Date(index[0]).toLocaleDateString(undefined, {
                    // weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                })
            );
        }
    };
    function loadChartState() {
        return {
            labels: timestamp(),
            datasets: [
                {
                    label: `Price in ${selectedCurrency.toUpperCase()}`,
                    data: chartData?.map((index) => index[1]),
                    pointRadius: 0.25,
                    tension: 0.05,
                    fill: true,
                },
            ],
        };
    }
    const [chartJsProps, setChartJsProps] = useState(loadChartState());

    useEffect(() => {
        setChartJsProps(loadChartState());
    }, [chartData]);

    return (
        <>
            <Line data={chartJsProps} />
        </>
    );
};

export default Chart;
