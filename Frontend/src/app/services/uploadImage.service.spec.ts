/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UploadImageService } from './uploadImage.service';

describe('Service: UploadImage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UploadImageService]
    });
  });

  it('should ...', inject([UploadImageService], (service: UploadImageService) => {
    expect(service).toBeTruthy();
  }));
});
