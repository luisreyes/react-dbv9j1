import React, { useState } from 'react';
import _ from 'underscore';
import FiltersContext from './../../Contexts/FiltersContext';
import './FilteredUsers.scss'

export default function FilteredUsers(props) {
  
  const [query, setQuery] = useState(['', 'name']);
  const [sortByLabel, setSortByLabel] = useState('name');

  const sortOptions = [
    {value:'name', label:'Name'},
    {value:'lastname', label:'Last Name'},
    {value:'email', label:'Email'},
    {value:'phone', label:'Phone'},
    {value:'city', label:'City'},
    {value:'state', label:'State'},
  ]

  return (
    <FiltersContext.Provider value={query}>
      
      <header className="filter-container">
        
        <div className="filter-fields">
          
          { /* Filter Search Bar */ }
          <input placeholder={'Filter'} maxLength="20" className="filter" type="search" onChange={(input) => setQuery([input.target.value, query[1]])} />
          
          { /* Sort Dropdown */ }
          <select className="custom-select" onChange={(event)=>{
            // This could use a custom react hook. e.g. useFilter
            // Update the sort selection and use current filter query stored in query[0]
            setQuery([query[0], event.target.value])
            setSortByLabel(_.findWhere(sortOptions,{value:event.target.value}).label)
          }}>

            { /* Sort Option from sortOptions array */ }
            {sortOptions.map( (option, index) => {
              return <option value={option.value} key={index}>{option.label}</option>
            })}

          </select>
        </div>
      
      </header>
      {console.log(query)}
      {props.children}
    </FiltersContext.Provider>
  );
}