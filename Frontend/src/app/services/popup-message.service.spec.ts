/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PopupMessageService } from './popup-message.service';

describe('Service: PopupMessage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopupMessageService]
    });
  });

  it('should ...', inject([PopupMessageService], (service: PopupMessageService) => {
    expect(service).toBeTruthy();
  }));
});
