import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true
const QUERY_RESPONSE = "query_response"


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor() { }


  clean(): void {
    window.sessionStorage.clear();
  }

  public saveLoggedUser(user: any): void {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.setItem(LOGGED_USER, JSON.stringify(user));
  }

  public saveQueryResponse(message: any): void {
    window.sessionStorage.removeItem(QUERY_RESPONSE);
    window.sessionStorage.setItem(QUERY_RESPONSE, JSON.stringify(message));
  }

  public isLogged(isLogged: boolean): void {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.setItem(LOGGED_USER, JSON.stringify(isLogged));
  }


  public getLoggedUser(): any {
    const song = window.sessionStorage.getItem(LOGGED_USER);

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
 




}
