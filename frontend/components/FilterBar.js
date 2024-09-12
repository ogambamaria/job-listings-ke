import { useState } from 'react';
import { Slider, Checkbox, FormControlLabel, RadioGroup, Radio } from '@mui/material';
import styles from '../styles/FilterBar.module.css';

export default function FilterBar() {
    const [salary, setSalary] = useState([1000, 5000]);

    const handleSalaryChange = (event, newValue) => {
        setSalary(newValue);
    };

    return (
        <aside className={styles.filterBar}>
            <h3>Filter</h3>

            <div className={styles.filterSection}>
                <label>Date Posted</label>
                <select>
                    <option value="anytime">Anytime</option>
                    <option value="last_24_hours">Last 24 hours</option>
                    <option value="last_7_days">Last 7 days</option>
                    <option value="last_30_days">Last 30 days</option>
                </select>
            </div>

            <div className={styles.filterSection}>
                <label>Job Type</label>
                <FormControlLabel control={<Checkbox />} label="Full-time" />
                <FormControlLabel control={<Checkbox />} label="Freelance" />
                <FormControlLabel control={<Checkbox />} label="Internship" />
            </div>

            <div className={styles.filterSection}>
                <label>Salary Range</label>
                <Slider
                    value={salary}
                    onChange={handleSalaryChange}
                    valueLabelDisplay="auto"
                    min={500}
                    max={10000}
                />
            </div>

            <div className={styles.filterSection}>
                <label>On-site/Remote</label>
                <RadioGroup>
                    <FormControlLabel value="onsite" control={<Radio />} label="On-site" />
                    <FormControlLabel value="remote" control={<Radio />} label="Remote" />
                    <FormControlLabel value="hybrid" control={<Radio />} label="Hybrid" />
                </RadioGroup>
            </div>

            <button className={styles.clearButton}>Clear All</button>
        </aside>
    );
}
