import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true
<<<<<<< HEAD
const OTP = "otp"
=======
const QUERY_RESPONSE = "query_response"
const QUERY_QUESTION = "query_question"
>>>>>>> 177c24a9413f1c44ac70d21133213e5091b8105c


@Injectable({
  providedIn: 'root'
})
export class SessionsService {

  constructor() {

   }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveLoggedUser(user: any): void {
    window.sessionStorage.removeItem(LOGGED_USER);
    window.sessionStorage.setItem(LOGGED_USER, JSON.stringify(user));
  }

<<<<<<< HEAD
  public saveOTP(otp: string): void {
    window.sessionStorage.removeItem(OTP);
    window.sessionStorage.setItem(OTP, JSON.stringify(otp));
=======
  public saveQueryResponse(message: any): void {
    window.sessionStorage.removeItem(QUERY_RESPONSE);
    window.sessionStorage.setItem(QUERY_RESPONSE, JSON.stringify(message));
  }

  public saveQueryQuestion(question: any): void {
    window.sessionStorage.removeItem(QUERY_QUESTION);
    window.sessionStorage.setItem(QUERY_QUESTION, JSON.stringify(question));
>>>>>>> 177c24a9413f1c44ac70d21133213e5091b8105c
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
<<<<<<< HEAD
 
  public getOTP(): any {
    const otp = window.sessionStorage.getItem(OTP);

    if (otp) {
      return JSON.parse(otp);
    }

    return {};
  }
 
=======
>>>>>>> 177c24a9413f1c44ac70d21133213e5091b8105c


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
