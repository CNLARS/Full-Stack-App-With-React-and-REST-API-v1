import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

/*This component provides the "Sign In" screen 
by rendering a form that allows a user to sign in
 using their existing account information.
  The component also renders a "Sign In" button
   that when clicked signs in the user and a "Cancel"
    button that returns the user to the default route
     (i.e. the list of courses).*/

export default class UserSignIn extends Component {
  state = {
    emailAddress: '',
    password: '',
    errors: [],
  }

  render() {
    const {
      emailAddress,
      password,
      errors,
    } = this.state;

    return (
      <div className="bounds">
        <div className="grid-33 centered signin">
          <h1>Sign In</h1>
          <Form 
            cancel={this.cancel}
            errors={errors}
            submit={this.submit}
            submitButtonText="Sign In"
            elements={() => (
              <React.Fragment>
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
            Don't have a user account? <Link to="/signup">Click here</Link> to sign up!
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
    const { from } = this.props.location.state || { from: { pathname: "/authenticated" } };
    const { emailAddress, password } = this.state;
      context.actions.signIn(emailAddress, password)
      .then( user => {
        if (user === null){
          this.setState(() => {
            return { errors: [ "Sign-in was unsuccessful" ] };
          });
        } else { 
          this.props.history.push(from);
          console.log(`Sign in: SUCCESS! ${emailAddress} is now logged in!`)
        }
      })
      .catch( err => {
        console.log(err);
        this.props.history.push("/error");
      })
  }

  cancel = () => {
    this.props.history.push("/");
  }
}
