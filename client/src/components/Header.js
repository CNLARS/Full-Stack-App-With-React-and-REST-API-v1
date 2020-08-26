import React from 'react';
import { Link } from 'react-router-dom';
import withContext from '../Context';

/*Top menu bar for the app:
 +Includes buttons for signing in/up 
 (if there's not an authenticated user) or displays
 the authenticated user's name and a button for signing out.*/

const Header = (props) => {
  const { context } = this.props;
  const authUser = context.authenticatedUser;
    return (
      <div className="header">
        <div className="bounds">
          <h1 className="header--logo">Courses</h1>
          <nav>
            {authUser ?
              <React.Fragment>
                <span>Welcome {authUser.firstName} {authUser.lastName}!</span>
                <Link to="/signout">Sign Out</Link>
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