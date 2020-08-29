/*"Update Course":
 A form that allows an authorizedUser to change course data.
  Includes an "Update Course" button,
   when clicked sends a PUT request to /api/courses/:id route.
    As well as a "Cancel" button to return user to "Course Detail" page. */

/*  Foundation Organizing from HTML markup:

      <div class="bounds course--detail">
        <h1>Update Course</h1>
        <div>
          <Form>
            <div class="grid-66">
              <div class="course--header">
                <h4 class="course--label">Update Course</h4>
                <div>
                <input 
                    id="title" 
                    name="title" 
                    type="text" 
                    class="input-title course--title--input" 
                    placeholder="Input New Course Name"
                    value="Build a Basic Bookcase" />
                </div>
                <p>By Joe Smith</p>
              </div>
              <div class="course--description">
                <div>
                <textarea 
                    id="description"
                    name="description" 
                    class="" 
                    placeholder="Course description..." />
                </div>
              </div>
            </div>
            <div class="grid-25 grid-right">
              <div class="course--stats">
                <ul class="course--stats--list">
                  <li class="course--stats--list--item">
                    <h4>Estimated Time</h4>
                    <div>
                    <input 
                        id="estimatedTime" 
                        name="estimatedTime" 
                        type="text" 
                        class="course--time--input"
                        placeholder="Hours" 
                        value="14 hours" />
                    </div>
                  </li>
                  <li class="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <div>
                    <textarea 
                        id="materialsNeeded" 
                        name="materialsNeeded" 
                        class="" 
                        placeholder="List course materials..." />
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="grid-100 pad-bottom">
            <button 
                class="button" 
                type="submit">Update Course</button>
            <button 
                class="button button-secondary" 
                onclick="event.preventDefault(); location.href='course-detail.html';">Cancel</button>
            </div>
          </Form>
        </div>
      </div>
*/