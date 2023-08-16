import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  private cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dbdhrolar/image/upload';
  private cloudinaryUploadPreset = 'u7pphfwg';

constructor(private http:HttpClient) { }

  uploadImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    return this.http.post(this.cloudinaryUrl, formData);
  }
}


