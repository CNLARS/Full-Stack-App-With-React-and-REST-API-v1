import React, { Component } from "react";
import Form from "./Form";

/*"Update Course":
 A form that allows an authorizedUser to change course data.
  Includes an "Update Course" button,
   when clicked sends a PUT request to /api/courses/:id route.
    As well as a "Cancel" button to return user to "Course Detail" page. */

    export default class UpdateCourse extends Component{
      constructor(props){
          super(props);
          this.state = {
            title: "",
            description: "",
            estimatedTime: "",
            materialsNeeded: "", 
            errors: [],
        };
      }

    async componentDidMount(){
      const { context } = this.props;
      const { id } = this.props.match.params;
         
         await context.data.getCourseByID(id)
         .then(response => {
            this.setState({
              title: response.title,
              description: response.description,
              estimatedTime: response.estimatedTime,
              materialsNeeded: response.materialsNeeded,
            }); 
            console.log(response); //Testing123
         })
            .catch(error => console.log(error));
   }

    render(){
      const { context } = this.props;
         const { 
              title,
              description,
              estimatedTime,
              materialsNeeded,
              errors } = this.state;

  return(
      <div className="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.updateCourse}
            submitButtonText="Update Course Details"
            elements={() => (<>
            <div className="grid-66">
              <div className="course--header">
                <h4 className="course--label">Update Course</h4>
                <div>
                <input 
                    id="title" 
                    name="title" 
                    type="text" 
                    onChange={this.change}
                    className="input-title course--title--input" 
                    placeholder="Course Title"
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
                    placeholder="Course description..."
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
                        value={estimatedTime || ""} />
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
                        className="course--materials" 
                        placeholder="List course materials..."
                        value={materialsNeeded || ""} />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            </>)}
            />
        </div>
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

        updateCourse = () => {
          const { context } = this.props;
          const { id } = this.props.match.params;
          const { emailAddress, password} = context.authenticatedUser;

          const {   
              title,
              description,
              estimatedTime,
              materialsNeeded  } = this.state;

              const course = {   
                  title,
                  description,
                  estimatedTime,
                  materialsNeeded  }

          context.data.updateCourse(id, course, emailAddress, password)
            .then( errors => {
              if(errors.length){
                this.setState({ errors });
              } else {
                // console.log(`Course: ${title} update: success!`);
                    this.props.history.push("/");
              }
            })
            .catch( err => {
              console.log(err);
              // this.props.history.push("/error"); Future123
            })
        }

        cancel = () => {
          const { id } = this.props.match.params;
          this.props.history.push(`/courses/${id}`);
        }

}