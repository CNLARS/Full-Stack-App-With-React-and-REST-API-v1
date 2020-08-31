import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/*This component renders the "Sign Up" form and allows a user to create a new account. 
+Includes a "Sign Up" button onClick sends POST request to REST API's /api/users route for user sign in.
+As well as a "Cancel" button that returns default route (course list). */

export default class UserSignUp extends Component {
  state = {
    firstName: '',
    lastName: '',
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign Up</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign Up"
            elements={() => (
              <React.Fragment>
                <input 
                  id="firstName" 
                  name="firstName" 
                  type="text"
                  value={firstName} 
                  onChange={this.change} 
                  placeholder="First Name" />
                <input 
                id="lastName" 
                name="lastName" 
                type="text"
                value={lastName} 
                onChange={this.change} 
                placeholder="Surname" />
                <input 
                  id="emailAddress" 
                  name="emailAddress" 
                  type="text"
                  value={emailAddress} 
                  onChange={this.change} 
                  placeholder="E-mail" />
                <input 
                  id="password" 
                  name="password"
                  type="password"
                  value={password} 
                  onChange={this.change} 
                  placeholder="Password" />
              </React.Fragment>
            )} />
          <p>
            Already have a user account? <Link to="/signin">Click here</Link> to sign in!
          </p>
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
  }

  submit = () => {
    const { context } = this.props;

    const {
      firstName,
      lastName,
      emailAddress,
      password,
    } = this.state;

    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
    };

    context.data.createUser(user)
      .then( errors => {
        if(errors.length){
          this.setState({ errors });
        } else {
          console.log(`Username: ${emailAddress} created; sign up and authentication successfully!`);
          context.actions.signIn(emailAddress, password)
            .then(() => {
              this.props.history.push("/authenticated");
            });
        }
      })
      .catch( err => {
        console.log(err);
        // this.props.history.push("/error"); //Future123
      })
  }

  cancel = () => {
    this.props.history.push("/");
  }
}
