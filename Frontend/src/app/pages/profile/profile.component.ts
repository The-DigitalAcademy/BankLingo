import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',

  template: `
  <div *ngIf="UsersService.isLoggedIn()">
    <!-- Your application content here -->
    <button (click)="logout()">Logout</button>
  </div>
  <div *ngIf="!UsersService.isLoggedIn()">
    <!-- Show login page or redirect to login page -->
  </div>`,

  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  progressValue = 35;
  maxValue = 100;constructor(
    private usersService: UsersService,
    private router: Router
  ) {}



  // Update the progressValue as needed (e.g., based on an event or timer)
  updateProgress() {
    this.progressValue += 10;
    if (this.progressValue > this.maxValue) {
      this.progressValue = this.maxValue;
    }
  }

  logout() {
    this.usersService.logout();
    this.router.navigate(['/login']); // Redirect the user to the login page
  }

}
