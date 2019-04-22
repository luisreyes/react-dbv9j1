import React, { useState, useEffect } from 'react';
import './UserCard.scss';

export default function User(props) {

  const [user, setUser] = useState(props);
  const [userFields, setUserFields] = useState({...user});
  const [editing, setEditing] = useState(false);
  
  const editFields = () => {
    console.log('EDIT FIELDS');
    setUserFields(user);
    setEditing(true);
  };

  const editField = (field, value) => {
    console.log('EDIT FIELD', field, value);
    let fields = {...userFields};
    fields[field] = value;
    setUserFields(fields);
  };

  const saveEdits = () => {
    console.log('SAVE EDITS', user);
    setUser({...user,...userFields});
    setEditing(false);
  };

  const cancelEdits = () => {
    console.log('CANCEL EDITS');
    setUser({...user});
    setEditing(false);
  };

  return (
    <li className={`user-card ${editing ? 'active' : ''}`}>

      <div className="user-card-front">
        <section className="user-card-top">
          <h2 className="user-name">{user.name}</h2>

          <div className="user-edit" onClick={() => {
            editFields();
          }}>

            { /* USER EDIT ICON */}
            <svg version="1" xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 225 225"><path d="M83.5 20.4c-14.6 4.6-24.7 16.5-27 31.8-1.5 9.8 4 24.4 11.8 31.4 2.2 2 6.9 5 10.6 6.7 5.7 2.7 7.6 3.1 14.6 3 10.7 0 17.7-2.8 25.4-9.9 25.2-23.3 8.3-64.8-26.2-64.3-2.9 0-7 .6-9.2 1.3zM177.7 109l-6.2 5.9 11.5 11.6 11.5 11.6 5.8-6c3.7-3.9 5.7-6.7 5.7-8.3 0-2.9-17.7-20.8-20.5-20.8-.9 0-4.5 2.7-7.8 6zM72.6 114.6c-20.6 4-39 14.8-49.2 28.6l-4.4 6V169h74.5l22.8-22.8c12.5-12.5 22.7-23 22.7-23.4 0-1.4-16.1-6.8-24.5-8.3-10.7-1.8-32.4-1.8-41.9.1zM133.7 152.8L103 183.5V206h23.5l30.5-30.5 30.5-30.5-11.5-11.5-11.5-11.5-30.8 30.8z" /></svg>

          </div>
          <img className="user-image" src={user.picture} />
        </section>

        <section className="user-card-bottom">
          <div className="user-email field">{user.email}</div>
          <div className="user-phone field">{user.phone}</div>
          <div className="user-location field">{user.city}, {user.state} </div>
        </section>
      </div>

      <div className="user-card-back">
        <section className="user-card-top">
          <h2 className="user-name">{user.name}</h2>

          <div className="user-cancel" onClick={() => {
            cancelEdits();
          }}>

            { /* USER CANCEL ICON */}
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 25 25"><path d="M23 20.168l-8.185-8.187L23 3.807 20.168 1l-8.182 8.179L3.81 1 1 3.81l8.186 8.196L1 20.19 3.81 23l8.203-8.192L20.193 23z"/></svg>

          </div>

          <div className="user-save" onClick={() => {
            saveEdits();
          }}>

            { /* USER SAVE ICON */}
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 25 25"><path d="M9 22L-1 11.402l2.798-2.859 7.149 7.473L22.091 2 25 4.806z"/></svg>


          </div>

        </section>

        <section className="user-card-bottom">
          <input placeholder="Email" value={userFields.email} type="email" className="email edit-field" onChange={(event)=>editField('email',event.target.value)}/>
          <input placeholder="Phone" value={userFields.phone} type="tel" className="phone edit-field" onChange={(event)=>editField('phone',event.target.value)}/>
          <input placeholder="City" value={userFields.city} type="text" className="city edit-field" onChange={(event)=>editField('city',event.target.value)}/>
          <input placeholder="State" value={userFields.state} type="text" className="state edit-field" onChange={(event)=>editField('state',event.target.value)}/>
        </section>
      </div>
    </li>
  )

}