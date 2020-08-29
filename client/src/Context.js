import React, { Component } from 'react';
import Data from "./Data";
import Cookies from "js-cookie";

const Context = React.createContext(); 

export class Provider extends Component {

  state = {
    authenticatedUser: Cookies.getJSON("authenticatedUser") || null,
    password: Cookies.getJSON("password") || null
  };

  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const { authenticatedUser, password } = this.state; //destructuring to extract authenticatedUser
    const value = {
      authenticatedUser,
      password,
      data: this.data,
      actions: {
        signIn: this.signIn, //Adds/Pass "actions" property and object for Provider's value
        signOut: this.signOut,
      },
    };
    
    return (
      <Context.Provider value={value}>
        {this.props.children}
      </Context.Provider>  
    );
  }

/*
  Accepts emailAddress and password as arguments
   to use credentials to authorize access to getUser() data:
*/
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null){
      user.password = password; //stringify password
      this.setState({ authenticatedUser: user });
      Cookies.set("authenticatedUser", JSON.stringify(user), { expires: 1 });
    }
    return user;
  }

  signOut = () => {
    this.setState({ authenticatedUser: null });
    Cookies.remove("authenticatedUser");
  }
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {context => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  }
}

