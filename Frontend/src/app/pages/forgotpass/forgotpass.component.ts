import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.services';

@Component({
  selector: 'app-forgotpass',
  templateUrl: './forgotpass.component.html',
  styleUrls: ['./forgotpass.component.scss']
})
export class ForgotpassComponent implements OnInit{

  form = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
  });

  email!: string;

  constructor(private router: Router, private userService: UsersService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    // Get the email value from the form control
    const email = this.form.get('email')?.value;
  
    if (email) {
      // Ensure email is not null or undefined before making the API call
      console.log(email);
      
      this.userService.sendPasswordResetOTP(email).subscribe(
        response => {
          this.email = response;
          console.log(response);
          
          // OTP sent successfully, navigate to OTP verification page
          this.router.navigate(['/otp'], { queryParams: { email } });
        },
        (error) => {
          // Handle OTP sending failure, show error message
          console.error('Error sending OTP:', error);
          // You can display an error message on the UI here
        }
      );
    } else {
      // Handle the case when the email is empty or not provided
      console.error('Email is empty or not provided.');
      // You can display an error message on the UI here
    }
  }
  
  

}