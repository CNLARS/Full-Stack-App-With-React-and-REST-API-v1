import config from "./config";

//Linking REST API and express; Data the helper class proving utility methods.
export default class Data {
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth){
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`);
      options.headers["Authorization"] = `Basic ${encodedCredentials}`;
    }
  
    return fetch(url, options);
  }

/* DATA VIA USER ROUTES */

//GET "/api/users", (200):
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password });
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error();
    }
  }
 
//POST "/api/users", (201):
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error();
    }
  }

/* DATA VIA COURSE ROUTES */

//GET "/api/courses", (200):
  async getCourses() {
    const response = await this.api("/courses", "GET",);
    if ( response.status === 200 ){
      return response.json().then(data => data);
    } 
    else if ( response.status === 404 ){
      return null;
    }
    else {
      throw new Error();
    }
  }

//GET "/api/courses/:id", (200):
  async getCourseByID(id) {
    const response = await this.api(`/courses/${id}`, "GET",);
    if ( response.status === 200 ){
      return response.json().then(data => data);
    }
    else if ( response.status === 404 ){
      return null;
    }
    else {
      throw new Error();
    }
  }

//POST "/api/courses" (201):
  async createCourse(course, emailAddress, password){
    const response = await this.api("/courses", "POST", course, true, { emailAddress, password });
    if ( response.status === 201 ){
      return [];
    }
    else if ( response.status === 400 ){
      response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

//PUT "/api/courses/:id" (204):
  async updateCourse(id, course, emailAddress, password){
    const response = await this.api(`/courses/${id}`, "PUT", course, true, { emailAddress, password } );
    if ( response.status === 204 ){
      return [];
    }
    else if ( response.status === 400 ){
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

//DELETE "/api/courses/:id" (204):
  async deleteCourse(id, emailAddress, password){
    const response = await this.api(`/courses/${id}`, "DELETE", null, true, { emailAddress, password })
    if ( response.status === 204 ){
      return [];
    } 
    else if ( response.status === 400 ){
      return response.json().then(data => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

}
//Reminder: api(path, method, body, requiresAuth, {credentials})!