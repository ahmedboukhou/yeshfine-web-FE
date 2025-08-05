import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarController,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js';
import { DownGradeIcon } from '../../../assets/icons';
import type { FC } from 'react';

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

type BarChartPropsType = {
	summary?: {
		Sun: number;
		Mon: number;
		Tue: number;
		Wed: number;
		Thu: number;
		Fri: number;
		Sat: number;
	};
	weekOverWeekChange?: string;
};
export const BarChart: FC<BarChartPropsType> = ({ summary, weekOverWeekChange }) => {
	const data = {
		labels: summary ? Object.keys(summary) : [],
		datasets: [
			{
				label: 'Visits',
				backgroundColor: '#4caf50',
				borderRadius: {
					topLeft: 80,
					topRight: 80,
					bottomLeft: 0,
					bottomRight: 0,
				},
				borderSkipped: false,
				data: summary ? Object.values(summary) : [],
				barPercentage: 0.5,
				categoryPercentage: 0.5,
			},
		],
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				display: false,
			},
			// tooltip: {
			//   callbacks: {
			//     label: (context) => `${context.parsed.y} visits`,
			//   },
			// },
		},
		scales: {
			x: {
				grid: {
					display: false,
					drawBorder: false,
				},

				ticks: {
					font: {
						size: 14,
					},
				},
			},

			y: {
				beginAtZero: true,
				max: 25,
				grid: {
					display: false,
				},
				ticks: {
					stepSize: 5,
					font: {
						size: 12,
					},
				},
			},
		},
	};

	return (
		<div className="card">
			<div style={{ height: '250px' }}>
				<Bar data={data} options={options} />
			</div>
			<div className="flex-center gap-1 mt-2">
				<DownGradeIcon />
				<span className="text-red-500 font-bold">{weekOverWeekChange}</span>
				<span className="text-typography-700">vs last week</span>
			</div>
		</div>
	);
};
