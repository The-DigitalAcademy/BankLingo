import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor() { }


  clean(): void {
    window.localStorage.clear();
  }

  public saveLoggedUser(user: any): void {
    window.localStorage.removeItem(LOGGED_USER);
    window.localStorage.setItem(LOGGED_USER, JSON.stringify(user));
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
 




}
