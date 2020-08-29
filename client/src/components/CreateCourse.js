import React, { Component } from "react";
import Form from "./Form";
import Data from "../Data";

/*"Create Course": 
Allows a user to create a new course.
 Includes a "Create Course" button, 
  onClick sends a POST request to /api/courses route.
  Includes a "Cancel" button, 
  returning the user to the "/" route (i.e. the list of courses).*/
export default class CreateCourse extends Component{
    constructor(){
        super();
        this.data = new Data();
    }
    
    state = {
        title: "",
        description: "",
        estimatedTime: "",
        materialsNeeded: "",
        userId: "",
        errors: [],
    };

        render(){
            const { context } = this.props;
               const { 
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                    userId,
                    errors } = this.state;
        return(
        <div className="bounds course--detail">
            <h1>Create Course</h1>
              <Form 
                  cancel={this.cancel}
                  errors={errors}
                  submit={this.submit}
                  submitButtonText="Add New Course"
                  elements={() => (<>
                <div className="grid-66">
                  <div className="course--header">
                    <h4 className="course--label">Course</h4>
                        <div>
                            <input 
                                id="title" 
                                name="title" 
                                type="text"
                                onChange={this.change}
                                className="input-title course--title--input" 
                                placeholder="Course title..."
                                value={title} />
                        </div>
                        <p>By: {context.authenticatedUser.firstName} {context.authenticatedUser.lastName}</p>
                  </div>
                        <div className="course--description">
                            <div>
                            <textarea 
                                id="description"
                                name="description" 
                                type="text"
                                onChange={this.change}
                                className="course--description" 
                                placeholder="Add Course description..."
                                value={description} />
                            </div>
                        </div>
                </div>
                <div className="grid-25 grid-right">
                  <div className="course--stats">
                    <ul className="course--stats--list">
                      <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <div>
                        <input 
                            id="estimatedTime" 
                            name="estimatedTime" 
                            type="text" 
                            onChange={this.change}
                            className="course--time--input"
                            placeholder="Hours" 
                            value={estimatedTime} />
                        </div>
                      </li>
                      <li className="course--stats--list--item">
                        <h4>Materials Needed</h4>
                        <div>
                        <textarea 
                            id="materialsNeeded" 
                            name="materialsNeeded"
                            type="text"
                            onChange={this.change} 
                            className="course--material--input" 
                            placeholder="List materials..."
                            value={materialsNeeded} />
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
            </>)}
            />
        </div>      
        );
    }

            change = (event) => {
                const name = event.target.name;
                const value = event.target.value;
            
                this.setState(() => {
                return {
                    [name]: value
                };
                });
            };

            submit = () => {
                const { context } = this.props;
                const { id, emailAddress, password} = context.authenticatedUser;
            
                //new User:
                const {   
                    title,
                    description,
                    estimatedTime,
                    materialsNeeded,
                    userId,
                    errors  } = this.state;

                    const course = {   
                        title,
                        description,
                        estimatedTime,
                        materialsNeeded,
                        userId  }
            
                context.data.createCourse(course, emailAddress, password)
                  .then( errors => {
                    if(errors.length){
                      this.setState({ errors });
                    } else {
                      console.log(`Course: ${title} created successfully!`);
                          this.props.history.push("/");
                    }
                  })
                  .catch( err => { //handles rejected promises 
                    console.log(err);
                    // this.props.history.push("/error");
                  })
              }

            cancel = () => {
                this.props.history.push("/");
              }
}// Component Bracket