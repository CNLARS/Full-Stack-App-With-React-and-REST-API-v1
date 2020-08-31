import React, { Component } from 'react';
import ReactMarkdown from "react-markdown";
import { NavLink } from "react-router-dom";

/* "Course Detail":

Renders a list of courses from /api/courses/:id route,
  "Delete Course" button, onClick a DELETE request is sent to /api/courses/:id route.
   + "Update Course" button 
    to navigate to the "Update Course" page.
      + "<ReactMarkdown>" to render course description and materialsNeeded.
         + "Update Course" and "Delete Course" buttons only display if:
            The authenticated user credentials match.
*/

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
      authUser: ""    
   };
}

      async componentDidMount(){
      const { context } = this.props;
      const { id } = this.props.match.params;
         
         await context.data.getCourseByID(id)
         .then(response => {
            this.setState({
               courseID: response.id,
               title: response.title,
               description: response.description,
               estimatedTime: response.estimatedTime,
               materialsNeeded: response.materialsNeeded,
               user: response.user,
               authUser: context.authenticatedUser,
            }); 
            // console.log(response); //Testing123 //HAPPY CODING
         })
            .catch(error => console.log(error));
   }

  render(){
   const {
      courseID,
      title,
      description,
      estimatedTime,
      materialsNeeded,
      user,
      authUser } = this.state;

   return (
      <>
         <div>
         <div className="actions--bar">
            <div className="bounds">
               <div className="grid-100">
                  <span>
                  {authUser ? 
                     ( authUser.emailAddress === user.emailAddress ? 
                        (  <>
                           <NavLink 
                              className="button" 
                              to={`/courses/${courseID}/update`}>
                              Update Course
                           </NavLink>
                           <NavLink 
                              className="button" 
                              onClick={this.deleteCourse}
                              to={`/courses/delete/${courseID}`}>
                              Delete Course
                           </NavLink>
                           </>
                        ) : ( <hr /> )
                     ) : ( <hr /> )
                  }
                  </span>
                  <NavLink 
                     className="button button-secondary" 
                     to="/">
                     Return to Course List
                  </NavLink>
               </div>
            </div>
         </div>
         <div className="bounds course--detail">
            <div className="grid-66">
               <div className="course--header">
               <h4 className="course--label">Course {courseID}:</h4>
               <h3 className="course--title">{title}</h3>
               <p>By: {user.firstName} {user.lastName}</p>
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

      deleteCourse = () => {
         const { context } = this.props;
         const { id } = this.props.match.params;
         const { emailAddress, password } = context.authenticatedUser;

         context.data.deleteCourse(id, emailAddress, password)
            .then( () => window.location.href = "/");
      }
}
