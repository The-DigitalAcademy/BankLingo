import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-popup-message',
  template: `
  <div class="popup-message" *ngIf="message">
    {{ message }}
  </div>
`,
  styles: [    `
  .popup-message {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #333;
    color: #0000;
    padding: 10px 20px;
    border-radius: 4px;
    z-index: 9999;
  }
  `,]
})
export class PopupMessageComponent implements OnInit {
  @Input() message: string | null = null;
  constructor() { }

  ngOnInit() {
  }

}
