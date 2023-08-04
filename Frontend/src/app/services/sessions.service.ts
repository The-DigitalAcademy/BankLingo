import { Injectable } from '@angular/core';


const LOGGED_USER = "loggedUser"
const IS_LOGGED = true
const OTP = "otp"
const QUERY_RESPONSE = "query_response"
const QUERY_QUESTION = "query_question"


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


  // public saveOTP(otp: string): void {
  //   window.sessionStorage.removeItem(OTP);
  //   window.sessionStorage.setItem(OTP, otp);
  // }
  // public saveOTP(otp: string): void {
  //   const otpObject = {
  //     number: Number(otp)
  //   };
  //   window.sessionStorage.removeItem(OTP);
  //   window.sessionStorage.setItem(OTP, JSON.stringify(otpObject));
  // }
  
  // sessions.service.ts
// public saveOTP(otp: string): void {
//   const otpObject = {
//     number: Number(otp)
//   };
//   window.sessionStorage.removeItem(OTP);
//   window.sessionStorage.setItem(OTP, JSON.stringify(otpObject));
// }

// sessions.service.ts

// public saveOTP(otp: number): void {
//   const otpObject = {
//     number: otp
//   };
//   window.sessionStorage.setItem(OTP, JSON.stringify(otpObject));
// }

public saveOTP(otp: number | null): void {
  if (otp !== null) {
    const otpObject = {
      number: otp
    };
    window.sessionStorage.setItem(OTP, JSON.stringify(otpObject));
  } else {
    window.sessionStorage.removeItem(OTP);
  }
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
 
  // public getOTP(): any {
  //   const otp = window.sessionStorage.getItem(OTP);

  //   if (otp) {
  //     return JSON.parse(otp);
  //   }

  //   return {};
  // }
  // public getOTP(): string {
  //   const otp = window.sessionStorage.getItem(OTP);
  //   return otp || ''; // Return an empty string if OTP is not found in sessionStorage
  // }

  public getOTP(): { number: number } | null {
    const otp = window.sessionStorage.getItem(OTP);

    if (otp) {
      return JSON.parse(otp);
    }

    return null;
  }

  
  
  // public getOTP(): any {
  //   const otp = window.sessionStorage.getItem(OTP);
  
  //   if (otp) {
  //     return JSON.parse(otp);
  //   }
  
  //   return null;
  // }
  
 


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
