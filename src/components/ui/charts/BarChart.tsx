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

ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, BarElement, BarController);

export const BarChart = () => {
	const data = {
		labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
				data: [15, 9, 6, 8, 13, 20, 13],
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
			<div className="flex-center gap-1">
				<DownGradeIcon />
				<span className="text-red-500 font-bold">-12%</span>
				<span className='text-typography-700'>vs last week</span>
			</div>
		</div>
	);
};
