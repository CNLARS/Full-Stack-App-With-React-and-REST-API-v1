import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './styles/global.css';

import Header from "./components/Header";
import Courses from "./components/Courses";
import UserSignUp from "./components/UserSignUp";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import Authenticated from "./components/Authenticated";
import PrivateRoute from "./PrivateRoute";
import NotFound from "./components/NotFound";

import CreateCourse from "./components/CreateCourse";
import CourseDetail from "./components/CourseDetail";
import UpdateCourse from "./components/UpdateCourse";

import withContext from "./Context";

const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const AuthWithContext = withContext(Authenticated);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);
const CourseDetailWithContext = withContext(CourseDetail);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/authenticated" component={AuthWithContext} />
        <Route path="/signin" component={UserSignInWithContext} />
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} />
        <PrivateRoute path="/testing123" component={AuthWithContext} />
        <Route exact path="/courses" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router>
);
