import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true
const QUERY_RESPONSE = "query_response"
const QUERY_QUESTION = "query_question"


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor() {

   }

  clean(): void {
    window.localStorage.clear();
  }

  public saveLoggedUser(user: any): void {
    window.localStorage.removeItem(LOGGED_USER);
    window.localStorage.setItem(LOGGED_USER, JSON.stringify(user));
  }

  public saveQueryResponse(message: any): void {
    window.sessionStorage.removeItem(QUERY_RESPONSE);
    window.sessionStorage.setItem(QUERY_RESPONSE, JSON.stringify(message));
  }

  public saveQueryQuestion(question: any): void {
    window.sessionStorage.removeItem(QUERY_QUESTION);
    window.sessionStorage.setItem(QUERY_QUESTION, JSON.stringify(question));
  }

  public isLogged(isLogged: boolean): void {
    window.localStorage.removeItem(LOGGED_USER);
    window.localStorage.setItem(LOGGED_USER, JSON.stringify(isLogged));
  }


  public getLoggedUser(): any {
    const song = window.localStorage.getItem(LOGGED_USER);

    if (song) {
      return JSON.parse(song);
    }

    return {};
  }


  public getQueryResponse(): any {
    const response = window.sessionStorage.getItem(QUERY_RESPONSE);

    if (response) {
      return JSON.parse(response);
    }

    return {};
  }
 
  public getQueryQuestion(): any {
    const question = window.sessionStorage.getItem(QUERY_QUESTION);

    if (question) {
      return JSON.parse(question);
    }

    return {};
  }
 
 

}
