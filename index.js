import React from 'react';
import { render } from 'react-dom';
import FilteredUsers from './Components/FilteredUsers/FilteredUsers';
import Users from './Components/Users/Users';
import './Styles/style.scss';

function App() {

  return (
    <FilteredUsers>
      <Users params={{ results: 50 }} />
    </FilteredUsers>
  )
}

render(<App />, document.getElementById('root'));