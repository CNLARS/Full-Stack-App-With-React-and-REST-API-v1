import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
// import axios from "axios";
import NotFound from "./NotFound";

/* 
This component provides the "Courses" screen by assembling a list of courses
 from the /api/courses route and rendering a list of courses.
   Each course linking to its "Course Detail" route.
    Component also renders a link to the "Create Course" page.
*/

export default class Courses extends Component{
  state = {
      courseList: []
    };

   async componentDidMount(){
    const { context } = this.props;
      await context.data.getCourses()
      .then(response => {
          this.setState({
          courseList: response
          })
        })
          .catch(error => console.log(error));
  }

  render(){
    let courses;
      
        this.state.courseList.length > 0 ?
          ( courses = this.state.courseList.map( (course) => 
          <div className="bounds" key={course.id}>
            <div className="grid-33">
              <NavLink className="course--module course--link" to={`/courses/${course.id}`} >
                <h4 className="course--label">Course {course.id}</h4>
                <h3 className="course--title">{course.title}</h3>
              </NavLink>
            </div>
          </div>
          ))
        :
          ( courses = <NotFound /> )
      
  
  return (
  <>
    <div className="bounds">
      <div className="course--container">
        <div className="grid-100">
            <h1>Courses To Expand Your Education!</h1>
          </div>
            <ul>
              {courses}
            </ul>
          <div className="grid-33" ><NavLink className="course--module course--add--module" to="/courses/create">
            <h3 className="course--add--title">
              <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 ">
                </polygon>
              </svg>Add New Course</h3></NavLink>
            </div>
      </div> 
       
    </div>
  </>
          );
  }
}
