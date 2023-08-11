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
import { environment } from 'src/environments/environment.development';
import { Message, Welcome } from '../types/TopicsIE';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  accessToken: any;
  user!: loggedUser;
  topics: any[] = [];
  constructor(private http: HttpClient, public storage: SessionsService) {}
  private cachedData: any;
  private cachedLessonsData: any;

  localURL = "http://localhost:4500/api/gpt"



  private getHeaders(): HttpHeaders {
    this.accessToken = sessionStorage.getItem('loggedUser');
    this.user = JSON.parse(this.accessToken) as loggedUser;
    if (!this.user) {
      console.log('There is no user');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`,
      'Content-Type': 'application/json'
      // 'Access-Control-Allow-Origin': 'true' // incorrec
      
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

  updateSearchedBefore(prompt: {
    email: string;
    searchedbefore: boolean;
  }): Observable<any> {
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


    if (this.cachedData) {
      return of(this.cachedData);
    } else {
      return this.http
        .get(
          `https://banklingoapi.onrender.com/api/search/get_history/${user_id}`,
          { headers }
        ).pipe(tap(data => this.cachedData = data),
          catchError((error: HttpErrorResponse) => {
            return throwError(error.error.message);
          })
        );
    }
  }

  generateTopics(prompt: { plan_id: number, plan_name: string, duration: number }): Observable<any> {

    const headers = this.getHeaders();
    return this.http
      .post('https://banklingoapi.onrender.com/api/gpt/generateTopics', prompt, {
        headers,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }


  saveLessonPlan(prompt: { duration: number, user_id: number, plan_name: string }): Observable<any> {

    const headers = this.getHeaders();
    return this.http
      .post('https://banklingoapi.onrender.com/api/gpt/create', prompt, {
        headers,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error.error.message);
        })
      );
  }

  getActiveLesson(plan_id: number): Observable<any> {
    const headers = this.getHeaders();


    if (this.cachedLessonsData) {
      return of(this.cachedLessonsData);
    } else {
      return this.http
        .get(
          `https://banklingoapi.onrender.com/api/gpt/get_user_plans/${plan_id}`,
          { headers }
        ).pipe(tap(data => this.cachedLessonsData = data),
          catchError((error: HttpErrorResponse) => {
            return throwError(error.error.message);
          })
        );
    }
  }




  askGPTinsideTopic(message: any): Observable<Message> {
    const headers = this.getHeaders();
    return this.http.post<Message>(environment.askGPTinsideTopic, message, {
      headers,
    });
  }
  getTopicsById(plan_number: number): Observable<Welcome[]> {
    const headers = this.getHeaders();
    return this.http.get<Welcome[]>(`${environment.getTopics}/${plan_number}`, {
      headers,
    });
  }

  updateCovered(plan_id: number, day: any) {
    const headers = this.getHeaders();
    return this.http.put(`${environment.updateCovered}/${plan_id}`, day, {
      headers,
    });
  }
}
