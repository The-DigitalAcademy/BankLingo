import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionsService } from './sessions.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Users } from '../types/users';
import { loggedUser } from '../types/LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  accessToken: any;
  user!: loggedUser;
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

  updateSearchedBefore(prompt: { message: string }): Observable<any> {
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
    return this.http
      .get(
        `https://banklingoapi.onrender.com/api/search/get_history/${user_id}`,
        { headers }
      )
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }
}
