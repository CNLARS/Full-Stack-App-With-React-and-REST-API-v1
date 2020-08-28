import React from 'react';
import { NavLink } from "react-router-dom";

export default ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>Access Granted: {authUser.firstName} {authUser.lastName}, Welcome!</h1>
      <p>Successful Sign In: {authUser.emailAddress}</p>
    </div>
    <div className="grid-100">
      <span>
      <NavLink className="button button-secondary" to="/">Return to Course List</NavLink>
      </span>  
    </div>
  </div>
  );
}