import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionsService } from './sessions.service';
import { BehaviorSubject, Observable, catchError, of, tap, throwError } from 'rxjs';
import { Users } from '../types/users';
import { loggedUser } from '../types/LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  accessToken: any;
  user!: loggedUser;
  private cachedData: any;


  constructor(private http: HttpClient, public storage: SessionsService) {}

  private getHeaders(): HttpHeaders {
    this.accessToken = sessionStorage.getItem('loggedUser');
    this.user = JSON.parse(this.accessToken) as loggedUser;
    if (!this.user) {
      console.log('There is no user');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }

  SearchTerm(prompt: { message: string }): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
    const headers = this.getHeaders();
    return this.http
      .post('https://banklingoapi.onrender.com/api/gpt', prompt, { headers })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  SearchTermWithHumor(prompt: { message: string }): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
    const headers = this.getHeaders();
    return this.http
      .post('https://banklingoapi.onrender.com/api/gpt/humour', prompt, {
        headers,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  updateSearchedBefore(prompt: { email: string, searchedbefore: boolean }): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
    const headers = this.getHeaders();
    return this.http
      .put('https://banklingoapi.onrender.com/api/user/update_boolean', prompt, {
        headers,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  saveToFavorites(
    user_id: number,
    search: { query_searched: string; response_searched: string }
  ): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
    const headers = this.getHeaders();
    return this.http
      .post(
        `https://banklingoapi.onrender.com/api/search/store_search/${user_id}`,
        search,
        { headers }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  getLatestFavouriteSearch(user_id: number): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
    const headers = this.getHeaders();


if(this.cachedData){
  return of(this.cachedData);
}else{
  return this.http
      .get(
        `https://banklingoapi.onrender.com/api/search/get_history/${user_id}`,
        { headers }
      ).pipe( tap(data => this.cachedData = data),
       catchError((error: HttpErrorResponse) => {
         return throwError(error.error.message);
       })
      );
  }
}

  
}
