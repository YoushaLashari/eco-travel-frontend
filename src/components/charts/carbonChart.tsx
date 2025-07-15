// LineChartComponent.tsx
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend, } from 'chart.js';
import React, { useMemo } from 'react';

// Register necessary components
ChartJS.register(LineElement, PointElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

interface Trips {
  id: number;
  name: string;
  destination: string;
  carbon_emission: number;
  start_date: Date;
  end_date: Date;
}

interface Props {
  trips: Trips[];
}

export default function CarbonChart({ trips }: Props){
    const monthLabels = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'];

    const carbonPerMonth = useMemo(() => {
        const monthTotals = Array(12).fill(0);
        const selectedYear = 2025;

        trips.forEach(trip => {
            const date = new Date(trip.start_date);
            const year = date.getFullYear();
            const monthIndex = date.getMonth();
            
            if (year === selectedYear) {
                monthTotals[monthIndex] += trip.carbon_emission;
            }
            
        });

        return monthTotals;
    }, [trips]);
    
    const data = {
        labels: monthLabels,
        datasets: [
            {
                label: 'Emessions',
                data:  carbonPerMonth,
                borderColor: 'rgb(255, 152, 0)',
                backgroundColor: 'rgb(255, 152, 0)',
                tension: 0.4,
                pointRadius: 0,
            },
            {
                label: 'Compensation',
                data: [27, 12, 53, 10, 13, 27, 20, 55, 50, 87, 80],
                borderColor: 'rgb(76, 175, 80)',
                backgroundColor: 'rgb(76, 175, 80)',
                tension: 0.4,
                pointRadius: 0,
            },
            {
                label: 'Objectifs',
                data: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
                borderColor: 'rgb(168, 168, 168)',
                backgroundColor: 'rgb(168, 168, 168)',
                tension: 0.4,
                pointRadius: 0,
                borderDash: [5, 5],
            },
        ],
    };

     const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Émissions de carbone par mois' },
        },
    };

    return (
        <div style={{ width: '99.9%', height: '500px' }} className='mx-auto flex place-content-center'>
            <Line data={data} options={options} />
        </div>
    );
}