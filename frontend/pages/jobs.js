import { useState, useEffect } from 'react';
import axios from 'axios';
import JobTable from '../components/JobTable';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import styles from '../styles/Jobs.module.css';
import NavBar from '../components/NavBar';

export default function Jobs() {
    const [sectorFilter, setSectorFilter] = useState('');
    const [degreeFilter, setDegreeFilter] = useState('');
    const [search, setSearch] = useState('');

    return (
        <div className={styles.container}>
            <NavBar />
            <FilterBar />
            <div className={styles.jobsContent}>
                <SearchBar
                    search={search}
                    setSearch={setSearch}
                />
                <JobTable 
                    search={search}
                    sectorFilter={sectorFilter}
                    degreeFilter={degreeFilter}
                />
            </div>
        </div>
    );
}
