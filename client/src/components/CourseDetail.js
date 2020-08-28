/* "Course Detail":

By retrieving the detail for a course from the REST API's
 /api/courses/:id route and rendering the page.
  +"Delete Course" button, when clicked sends a DELETE request to 
    the /api/courses/:id route.
   +"Update Course" button 
    to navigate to the "Update Course" page.
    
    ! Use the <ReactMarkdown> component to render course description
     and materialsNeeded properties as markdown formatted text.
     
 "Update Course" and "Delete Course" buttons only display if:
   There's an authenticated user.
   AND the user's emailAddress/ID/Credentials matches that of the user who owns the course.

Use the <ReactMarkdown> component to render the
 course description and materialsNeeded properties
  as markdown formatted text.
Study Reference: https://medium.com/young-developer/react-markdown-code-and-syntax-highlighting-632d2f9b4ada
*/

/* 
This component provides the "Courses" screen by assembling a list of courses from the
  REST API's /api/courses route and rendering a list of courses.
   Each course linking to its "Course Detail" route.
    Component also renders a link to the "Create Course" page.
*/

import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";


export default class CourseDetail extends Component{
   constructor(){
      super();
      this.state = 
   {
      courseID: "",
      title: "",
      description: "",
      estimatedTime: "",
      materialsNeeded: "",
      user: "",
      userId: "",
      authenticatedUser: ""    
   };
}

   async componentDidMount(){
    const { context } = this.props;
    const { id } = this.props.match.params;
      
      context.data.getCourseByID(id)
      .then(response => {
          this.setState({
            courseID: response.id,
            title: response.title,
            description: response.description,
            estimatedTime: response.estimatedTime,
            materialsNeeded: response.materialsNeeded,
            // user: response.user,
            userId: response.userId,
            authenticatedUser: context.authenticatedUser,
          }); console.log(response)
        })
          .catch(error => console.log(error))
            .finally(console.log("Go Go Gadget: CourseDetailWithContext!"));
  }

  render(){
   const {
      courseID,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user,
      userId,
      authenticatedUser } = this.state;

   return (
   <>
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
               <span>
               <NavLink className="button" to={`/courses/${courseID}/update`}>Update Course</NavLink>
               <NavLink className="button" to="#">Delete Course</NavLink>
               </span>
               <NavLink className="button button-secondary" to="/">Return to Course List</NavLink>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course {courseID}:</h4>
              <h3 className="course--title">{title}</h3>
              <p>By: {userId}</p>
            </div>
            <div className="course--description">
              <ReactMarkdown source={description} />
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>
                    <ReactMarkdown source={materialsNeeded} />
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
  </>
          );
  }
}
