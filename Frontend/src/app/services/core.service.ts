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
  



}
