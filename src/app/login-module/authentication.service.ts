import { Injectable } from '@angular/core';
import {User} from "./user.class";
import * as Cookies from 'es-cookie';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  users :User[] = [ { "username": "user1", "password": "pass1", "fullName": "John Doe" },
      { "username": "user2", "password": "pass2", "fullName": "Adam Smith" } ];
  constructor() {

  }

  /**
   * This function send a request to the server with the credentials and check if the user is authenticated
   * @param username
   * @param password
   */
  authenticateUser(username, password){
    /**
     * Note- a real authentication should be used with hashing and ssl security (including jsSession cookie)
     * I'm using promise to create a code that is similar to http call
     */
    const promise = new Promise((resolve, reject)=>{
      this.users.forEach((user)=>{
        if (user.username === username && user.password === password){
          return resolve ( {authenticated: true, fulleName: user.fullName});
        }
      });
      resolve({authenticated: false, message: "Couldn't authenticate username and password"});
    });
    promise.then((response)=>{
      if (response.hasOwnProperty("authenticated")  && response['authenticated']){
        Cookies.set('authenticated', 'true');
      }
    });
    return promise;
  }

  /**
   * A function that returns if the user is already logged on.
   * In real production we're using hash cookies to keep the credentials. and if the server response that he doesn't
   * know the session cookie- it will logout the user and redirect him to "login" page
   */
  isAuthenticated(){
    return 'true' === Cookies.get('authenticated');
  }

  /**
   * Logout the user
   */
  logout(){
    Cookies.set('authenticated','false');
  }
}
