import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionsService } from './sessions.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {


  constructor(private http: HttpClient, public storage:SessionsService) {}

  SearchTerm(prompt: { message: string }): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
      return this.http.post("https://banklingoapi.onrender.com/api/gpt", prompt).pipe(

      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }
  
  saveToFavorites(user_id: number, search: { query_searched: string, response_searched: string }): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
      return this.http.post(`https://banklingoapi.onrender.com/api/search/store_search/${user_id}`, search).pipe(

      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }


  getLatestFavouriteSearch(user_id: number): Observable<any> {
    // return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
      return this.http.get(`https://banklingoapi.onrender.com/api/search/get_history/${user_id}`).pipe(

      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }


}
