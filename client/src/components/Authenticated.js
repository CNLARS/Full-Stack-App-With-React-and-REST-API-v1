import React from 'react';

export default ({ context }) => {
  const authUser = context.authenticatedUser;
  return (
  <div className="bounds">
    <div className="grid-100">
      <h1>Access Granted: {authUser.firstName} {authUser.lastName}, Welcome!</h1>
      <p>Sign In credentials using: {authUser.emailAddress}</p>
    </div>
  </div>
  );
}