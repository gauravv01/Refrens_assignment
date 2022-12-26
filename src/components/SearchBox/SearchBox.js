// Component to render the search box and change the filters state when the search box value is changed

import React from 'react';
import searchstyle from './SearchBox.module.css';

export const SearchBox = ({value,setFilters,filters}) => {
  return (
    <div>
      <input
        data-testid="search"
        placeholder="Search..."
        value={value}
        className={searchstyle.input}
        onChange={(event) =>
          setFilters({ ...filters, search: event.target.value })
        }></input>
    </div>
  );
};
