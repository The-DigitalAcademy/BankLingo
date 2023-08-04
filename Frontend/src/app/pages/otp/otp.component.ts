import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  providers: [SessionsService]
})
export class OtpComponent {

public email!: string;
public otp!: number;
public otpSent = false;
number1!: string;
isInvalidOTP = false;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private userService: UsersService,
  private sessions : SessionsService,
  private password : PasswordServiceService
) {}

ngOnInit(): void {
  
  // Fetch the email from the query parameters.
  this.route.queryParams.subscribe((params) => {
    this.email = params['email'];
  });

}

onOtpInput() {
  // Limit the OTP input to numeric characters using regex
  //this.otp = this.otp.replace(/\D/g, '');
}

verifyOtp() {
  this.password.verifyOtp(this.email, this.otp).subscribe(
    () => {
      // OTP verification successful, handle success or redirect to reset password component
      console.log('Successfully verified');
      this.router.navigate(['/resetpassword'])
      
    },
    (error) => {
      // Handle error (e.g., show error message)
      console.log('error');
      
    }
  );
}

resendOtp() {
  this.password.resendOtp(this.email).subscribe(
    () => {
      // OTP resent successfully, handle success or show message
      this.router.navigate(['/resetpassword'])
    },
    (error) => {
      // Handle error (e.g., show error message)
    }
  );
}

}