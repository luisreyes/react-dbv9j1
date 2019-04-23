import React, {useReducer} from 'react';
let users = [];
export default function UserReducer(state, action) {
  console.log(state, action);
  switch (action.type) {
    case 'UPDATE_USER': 
      return users.map((user, index)=>{
          if(user.login.uuid === action.data.id){

            user = {
              ...user,
              name:{
                first:action.data.name.first, 
                last: action.data.name.last
                },
              email: action.data.email,
              phone: action.data.phone,
              location:{
                city:action.data.city,
                state:action.data.state
                }
              };
              
            users[index] = user;
          }
          return user;
      });
    case 'ADD_USERS': 
      return users = action.data;
    
    default:
      throw new Error();
  }
}
