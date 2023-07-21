import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupMessageService {

constructor() { }

message: string | null = null;

showMessage(message: string): void {
  this.message = message;
  setTimeout(() => {
    this.clearMessage();
  }, 3000); // Duration after which the message will be cleared (in milliseconds)
}

clearMessage(): void {
  this.message = null;
}

}
