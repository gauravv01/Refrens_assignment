// Component to render filter options and change the filters state when the filter dropdowns are changed

import React from 'react';
import { Constants } from '../../Constants/Constants';
import filterstyles from './Filter.module.css';

export const FilterOptions = ({filters,setFilters}) => {
  // Constant containing the filters and their dropdown options
  const types = {
    Gender: Constants.GENDER_LIST,
    Status: Constants.STATUS_LIST,
    Species: Constants.SPECIES_LIST
  };

  return (
    <div data-testid="filters" className={filterstyles.all_filters}>
      {Object.keys(types).map((val, index) => {
        return (
          <div
            key={index}
            className={filterstyles.single_filter}>
            <span className={filterstyles.filter_heading}>{val}</span>
            <select
              className={filterstyles.filter_options}
              name={val}
              key={index}
              onChange={(event) =>
                setFilters({
                  ...filters,
                  [val]: event.target.value
                })
              }>
              {types[val].map((type, index) => {
                return (
                  <option key={index} value={type}>
                    {type}
                  </option>
                );
              })}
            </select>
          </div>
        );
      })}
    </div>
  );
};
