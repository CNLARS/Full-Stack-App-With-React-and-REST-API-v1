import React from 'react';
import { NavLink } from 'react-router-dom';

/*Top menu bar for the app:
 +Includes buttons for signing in/up 
 (if there's not an authenticated user) or displays
 the authenticated user's name and a button for signing out.*/

const Header = (props) => {
  const { context } = props;
  const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            {authUser ?
              <React.Fragment>
                <span>Welcome {authUser.firstName} {authUser.lastName}!</span>
                <NavLink to="/signout">Sign Out</NavLink>
              </React.Fragment>
            :
              <React.Fragment>
                <NavLink className="signup" to="/signup">Sign Up</NavLink>
                <NavLink className="signin" to="/signin">Sign In</NavLink>
              </React.Fragment>
            }
          </nav>
        </div>
      </div>
    );

};

export default Header;