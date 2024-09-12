import { TextField, Button } from '@mui/material';
import styles from '../styles/SearchBar.module.css';

export default function SearchBar({ search, setSearch }) {
    return (
        <div className={styles.searchBar}>
            <TextField
                label="Search job title or keyword"
                variant="outlined"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <TextField
                label="Search location"
                variant="outlined"
                fullWidth
                style={{ marginLeft: '1rem' }}
            />
            <Button variant="contained" color="primary" className={styles.searchButton}>
                Find jobs
            </Button>
        </div>
    );
}
