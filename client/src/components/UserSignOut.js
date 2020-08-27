import React, { useEffect} from 'react';
import { Redirect } from 'react-router-dom';

/*This component doesn't render any visual elements.
  Signs out the authenticated user and redirects to the home route
    (i.e. the list of courses).*/

export default ({ context }) => {
    // context.actions.signOut(); //Happy Coding
  // For 'side effects' "useEffect()" is called when component calls signOut and updates state after render.
  useEffect(() =>  context.actions.signOut());
  return (
    <Redirect to="/" />
  );
}
