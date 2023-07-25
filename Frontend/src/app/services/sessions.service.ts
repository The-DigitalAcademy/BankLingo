import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true
const OTP = "otp"


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

  public saveOTP(otp: string): void {
    window.sessionStorage.removeItem(OTP);
    window.sessionStorage.setItem(OTP, JSON.stringify(otp));
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
 
  public getOTP(): any {
    const otp = window.sessionStorage.getItem(OTP);

    if (otp) {
      return JSON.parse(otp);
    }

    return {};
  }
 




}
