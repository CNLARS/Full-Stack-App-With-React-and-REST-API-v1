/* 
This component provides the "Courses" screen by retrieving the list of courses from the
  REST API's /api/courses route and rendering a list of courses.
   Each course needs to link to its respective "Course Detail" screen.
    This component also renders a link to the "Create Course" screen.
*/

import React, { Component } from 'react';

export default class Courses extends Component {
  render() {
    return (
      <div className="bounds">
        <div className="grid-100">
          <h1>Welcome to the Home Page, a collection of Courses to expand your education!</h1>
        </div>
      </div>
    );
  }
}
