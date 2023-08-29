import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkstatusService {
  onlineStatusChanged = new Subject<boolean>();

constructor() { 
  this.initialize();
}

private initialize() {
  window.addEventListener('online', () => this.updateOnlineStatus());
  window.addEventListener('offline', () => this.updateOnlineStatus());
}

private updateOnlineStatus() {
  this.onlineStatusChanged.next(navigator.onLine);
}

}
