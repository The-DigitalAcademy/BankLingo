import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  private cloudinaryApiUrl =
    'https://api.cloudinary.com/v1_1/dbdhrolar/resources/image';
  private cloudinaryApiKey = '716837615899186';
  private cloudinaryApiSecret = 'Z5nCMDCFGf5PYUimMJHCzVGdtR4';

  constructor(private http: HttpClient) {}

  getImagesInFolder(folderName: string): Observable<any> {
    const params = new HttpParams()
      .set('cloud_name', 'dbdhrolar')
      .set('api_key', this.cloudinaryApiKey)
      .set('api_secret', this.cloudinaryApiSecret)
      .set('prefix', folderName); // Set the folder name as the prefix

    return this.http.get(this.cloudinaryApiUrl, { params });
  }
}
