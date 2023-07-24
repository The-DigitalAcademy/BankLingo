import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.services';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  email!: string;
  otp!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  onSubmit(): void {
    this.userService.verifyOTP(this.email, this.otp).subscribe(
      (response) => {
        // OTP verification successful, redirect to reset password page
        this.router.navigate(['/resetpassword'], {
          queryParams: { email: this.email },
        });
      },
      (error) => {
        // Handle OTP verification failure, show error message
        console.error('Error verifying OTP:', error);
        // You can display an error message on the UI here
      }
    );
  
}
}