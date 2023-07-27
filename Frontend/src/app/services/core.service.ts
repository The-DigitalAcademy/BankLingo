import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionsService } from './sessions.service';

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
  


//   searchSong(songName: string) {
//     const url = 'http://localhost:4000/detect/song';

//     return this.http.get(url, { params: { songName } });
    

    
// }
}
