// Dependencies
import React, { useState, useEffect } from 'react';
import axios from './API/Instance';
import { Constants } from './Constants/Constants';
import styles from './App.module.css';

// Components
import CharList from './components/Characters/CharList';
import { SearchBox } from './components/SearchBox/SearchBox';
import { FilterOptions } from './components/Filters/FilterOptions';

function App() {
  const [filters, setFilters] = useState({
    search: '',
    Status: '',
    Gender: '',
    Species: ''
  }); // State containing all the filters
  const [pageNumber, setPageNumber] = useState(1); // State containing the page number
  const [chars, setChars] = useState([]); // State to store the character data from the API
  const [loading, setLoading] = useState(false); // State to store the loading status of the API call

  // Function to fetch the character data from the API on page load and when filter options are changed
  const getCharRequest = async (filters) => {
    setLoading(true);
    const res = await axios.get(`character/?name=${filters.search}&status=${filters.Status}&gender=${filters.Gender}&species=${filters.Species}&page=${pageNumber}`);
    const resJson = await res.data;
    setChars(resJson.results); // Reset character data in the state
    setLoading(false);
  };

  // Function to fetch the character data from the API when scroll to bottom is reached
  const getPageIncRequest = async (filters, pageNumber) => {
    setLoading(true);
    const res = await axios.get(`character/?name=${filters.search}&status=${filters.Status}&gender=${filters.Gender}&species=${filters.Species}&page=${pageNumber}`);
    const resJson = await res.data;
    setChars([...chars, ...resJson.results]); // Appending the next page's character data to the existing data
    setLoading(false);
  };

  // UseEffect triggered when filters are changed
  useEffect(() => {
    setPageNumber(1);
    getCharRequest(filters);
    // eslint-disable-next-line
  }, [filters]);

  // UseEffect triggered when page number is changed (scroll to bottom)
  useEffect(() => {
    getPageIncRequest(filters, pageNumber);
    // eslint-disable-next-line
  }, [pageNumber]);

  // Function to increment the page number when scroll to bottom is reached
  window.onscroll = function () {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <div className={styles.main}>
      <div
        className={styles.main_a}>
        {Constants.RICKY_AND_MICKY}
      </div>
      <div className={styles.main_b}>
        <SearchBox filters={filters} setFilters={setFilters} />
        <FilterOptions filters={filters} setFilters={setFilters} />
      </div>
      <div className={styles.main_c}>
        {chars ? (
          <CharList chars={chars} />
        ) : (
          <div className={styles.main_c_a}>
            {Constants.NO_RESULTS}
          </div>
        )}
        {loading && (
          <div className={styles.main_c_b}>
            {Constants.LOADING}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
