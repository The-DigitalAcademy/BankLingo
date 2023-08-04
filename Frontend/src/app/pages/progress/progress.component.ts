import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';

import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Users } from 'src/app/types/users';

import { HttpClient } from '@angular/common/http';
import { SessionsService } from 'src/app/services/sessions.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-progress',
  template: `
  <div *ngIf="UsersService.isLoggedIn()">
    <!-- Your application content here -->
    <button (click)="logout()">Logout</button>
  </div>
  <div *ngIf="!UsersService.isLoggedIn()">
    <!-- Show login page or redirect to login page -->
  </div>`,

  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  user!: any;
  profileForm!: FormGroup;
  

  progressValue = 35;
  maxValue = 100;constructor(
    private usersService: UsersService,
    private router: Router, private formBuilder: FormBuilder,
    
    private session: SessionsService,
  ) {}

  ngOnInit() {
    // Retrieve the user data from session storage
    this.user = this.session.getLoggedUser();

    // Check if the user variable contains valid user data before initializing the form
    if (this.user && Object.keys(this.user).length > 0) {
      this.initializeForm();
    } else {
      // Handle the case when the user data is not available
      console.log('User data not found in session storage');
      // You can take appropriate actions, such as redirecting the user to the login page.
    }
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
     
      email: [this.user.email, [Validators.required, Validators.email]],
     
    });
  }

  updateProgress() {
    this.progressValue += 10;
    if (this.progressValue > this.maxValue) {
      this.progressValue = this.maxValue;
    }
  }

}
