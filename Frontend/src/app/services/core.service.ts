import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionsService } from './sessions.service';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  private apiUrls = 'http://localhost:4500';

  constructor(private http: HttpClient, public storage:SessionsService) {}

  SearchTerm(prompt: { queryMessage: string }): Observable<any> {
    return this.http.post(`${this.apiUrls}/api/gpt`, prompt).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(error.error.message);
      })
    );
  }
  


//   searchSong(songName: string) {
//     const url = 'http://localhost:4000/detect/song';

//     return this.http.get(url, { params: { songName } });
    

    
// }
}
