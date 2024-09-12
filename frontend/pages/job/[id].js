import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../styles/JobDetails.module.css';
import NavBar from '../../components/NavBar';

export default function JobDetails() {
    const router = useRouter();
    const { id } = router.query;
    const [job, setJob] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/jobs/${id}`)
                .then(response => setJob(response.data))
                .catch(err => console.error(err));
        }
    }, [id]);

    return (
        <div className={styles.container}>
            <NavBar />
            {job ? (
                <div className={styles.jobDetails}>
                    <h1 className={styles.title}>{job.position}</h1>
                    <p className={styles.company}><strong>Company:</strong> {job.company}</p>
                    <p className={styles.location}><strong>Location:</strong> {job.location}</p>
                    <p className={styles.industry}><strong>Industry:</strong> {job.industry}</p>
                    <p className={styles.published}><strong>Published:</strong> {new Date(job.published).toLocaleDateString()}</p>
                    <p className={styles.description}><strong>Description:</strong> {job.description}</p>
                    <a href={job.link} className={styles.applyLink} target="_blank" rel="noopener noreferrer">Apply Here</a>
                </div>
            ) : (
                <p>Loading job details...</p>
            )}
        </div>
    );
}
