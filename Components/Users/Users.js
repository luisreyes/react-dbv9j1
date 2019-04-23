import React, { useState, useEffect, useContext, useReducer } from 'react';
import { FiltersContext } from './../../Contexts/FiltersContext';
import UserReducer from './../../Reducers/UserReducer';
import UserCard from './../UserCard/UserCard';
import './Users.scss';

export default function Users(props) {

  // API endpoint configuration
  const API_BASEURL = 'https://randomuser.me/api/';
  const QUERY_PARAMS = { results: 24, nat: 'US', ...props.params };

  // React context from parent provider
  const filters = useContext(FiltersContext);

  // State management variables
  const [params, setParams] = useState(QUERY_PARAMS || {});
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [state, dispatch] = useReducer(UserReducer);

  // Final API endpoint
  const URL = API_BASEURL + '?' + Object.keys(params).map(key => key + '=' + params[key]).join('&');

  useEffect(() => {

    // Fetch data if it doesn't exist
    if (!users.length) {

      fetch(URL)
        .then(response => response.json())
        .then(result => {

          // Set users to variable
          setUsers(result.results);

          // Dispatch to all users to store
          dispatch({type: 'ADD_USERS', data: result.results});

          // Set loading status
          setIsLoading(false);
        })
        .catch(e => {
          // Log errors to the console
          console.error(e);
          // Set error to variable for UI display
          setError(e);
        });
    }
  });

  let getNormalizedUsers = () => {
    // Initialize collection of normalized user objects
    let normalizedUsers = [];

    // Loop through users
    users.map((user) => {

      // Normalize user object for sorting
      const normalizedUser = Object.assign({}, {
        id: user.login.uuid,
        fullname: user.name.first + ' ' + user.name.last,
        name:{
          first: user.name.first,
          last: user.name.last,
        },
        email: user.email,
        city: user.location.city,
        state: user.location.state,
        phone: user.phone,
        picture: user.picture.large
      });

      // Make user object an UpperCase String to overcome case sensitivity.
      const userStr = JSON.stringify(normalizedUser).toUpperCase();
      const filterStr = filters[0].toUpperCase();

      // Lookup the filter query in the stringified user object using String.include()
      if(userStr.includes(filterStr))
        normalizedUsers.push(normalizedUser);

    });

    return _.sortBy(normalizedUsers, filters[1]);

  };

  // FINAL COMPONENT RENDER //
  // ====================== //

  // If data is not available yet, display loading state.
  if (isLoading) {
    return <div className="loading">Loading</div>
  } else {
    
    // Get Normalized, Filtered, and Sorted users
    const people = getNormalizedUsers();

    return (
      // Display UserCards for each user in the final array.
      <ul className="user-cards">
        {people.map((person, index) => {
          return <UserCard {...person} key={person.id} />;
        })}
      </ul>
    );
  }
}
