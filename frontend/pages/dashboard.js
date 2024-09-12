import { useState, useEffect } from 'react';
import axios from 'axios';
import { Line, Doughnut } from 'react-chartjs-2';
import styles from '../styles/Dashboard.module.css';
import NavBar from '../components/NavBar';

// Import necessary components from Chart.js
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
);

export default function Dashboard() {
    const [jobData, setJobData] = useState([]);
    
    useEffect(() => {
        axios.get('http://localhost:8000/jobs/stats')
            .then(response => setJobData(response.data))
            .catch(err => console.error(err));
    }, []);

    const lineChartData = {
        labels: jobData.map(item => item.date),
        datasets: [{
            label: 'Jobs Posted Per Day',
            data: jobData.map(item => item.count),
            fill: true,
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            tension: 0.3
        }]
    };

    const doughnutData = {
        labels: ['Direct', 'Facebook', 'Twitter', 'Others'],
        datasets: [
            {
                label: 'Sources',
                data: [50, 40, 70, 25],
                backgroundColor: [
                    'rgba(59, 130, 246, 1)',
                    'rgba(79, 195, 247, 1)',
                    'rgba(240, 98, 146, 1)',
                    'rgba(156, 39, 176, 1)',
                ],
            },
        ],
    };

    return (
        <div className={styles.dashboard}>
            <NavBar />
            <div className={styles.statsCards}>
                <div className={styles.card}>
                    <h3>Total Jobs</h3>
                    <p>100</p>
                </div>
                <div className={styles.card}>
                    <h3>New Jobs Today</h3>
                    <p>10</p>
                </div>
                <div className={styles.card}>
                    <h3>Remote Jobs</h3>
                    <p>25</p>
                </div>
                <div className={styles.card}>
                    <h3>Internships</h3>
                    <p>15</p>
                </div>
            </div>

            <div className={styles.chartsContainer}>
                <div className={styles.lineChart}>
                    <h3>Jobs Posted Over Time</h3>
                    <Line data={lineChartData} />
                </div>
                <div className={styles.doughnutChart}>
                    <h3>Job Sources</h3>
                    <Doughnut data={doughnutData} />
                </div>
            </div>
        </div>
    );
}
