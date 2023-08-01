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

uploadImage(imageData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.cloudinaryUploadPreset}`
    });

    // const corsProxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Use the cors-anywhere proxy service

    return this.http.post( this.cloudinaryUrl, imageData, {headers});
  }

  uploadSignature(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.cloudinaryUploadPreset);

    return this.http.post(this.cloudinaryUrl, formData);
  }
}


