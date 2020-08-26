/* This component provides the "Course Detail" screen 
by retrieving the detail for a course from the REST API's
 /api/courses/:id route and rendering the course.
  The component also renders a "Delete Course" button
   that when clicked should send a DELETE request to 
   the REST API's /api/courses/:id route in order to delete a course.
    This component also renders an "Update Course" button 
    for navigating to the "Update Course" screen.
    
    ! Use the <ReactMarkdown> component to render course description
     and materialsNeeded properties as markdown formatted text.
     
On the "Course Detail", add rendering logic so the
 "Update Course" and "Delete Course" buttons only display if:
There's an authenticated user.
And the user's ID matches that of the user who owns the course.

Use the <ReactMarkdown> component to render the
 course description and materialsNeeded properties
  as markdown formatted text.

     */