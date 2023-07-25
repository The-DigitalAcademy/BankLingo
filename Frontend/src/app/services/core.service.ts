import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionsService } from './sessions.service';

@Injectable({
  providedIn: 'root'
})
export class CoreService {


  constructor(private http: HttpClient, public storage:SessionsService) {}


//   searchSong(songName: string) {
//     const url = 'http://localhost:4000/detect/song';

//     return this.http.get(url, { params: { songName } });
    

    
// }
}
