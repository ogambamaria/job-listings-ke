import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import styles from '../styles/JobTable.module.css';

export default function JobTable({ search, sectorFilter, degreeFilter }) {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/jobs')
            .then(response => setJobs(response.data))
            .catch(err => console.error(err));
    }, []);

    const filteredJobs = jobs.filter(job => 
        job.title.toLowerCase().includes(search.toLowerCase()) &&
        (sectorFilter === '' || job.industry === sectorFilter)
    );

    return (
        <div className={styles.jobTableContainer}>
            <h3>{filteredJobs.length} Jobs found</h3>
            <div className={styles.jobList}>
                {filteredJobs.map(job => (
                    <div key={job.id} className={styles.jobCard}>
                        <div className={styles.jobHeader}>
                            <Link href={`/job/${job.id}`}>
                                <a className={styles.jobTitle}>{job.position}</a> {/* Make the job position a link */}
                            </Link>
                            <span>{job.company} - {job.location}</span>
                        </div>
                        <div className={styles.jobFooter}>
                            <span>{job.industry}</span>
                            <span>Posted on {new Date(job.published).toLocaleDateString()}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
