import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';
import Swal from 'sweetalert2';

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
seconds = 60;
user!:Users;

constructor(
  private route: ActivatedRoute,
  private router: Router,
  private userService: UsersService,
  private sessions : SessionsService,
  private password : PasswordServiceService,
  
) {}

ngOnInit(): void {
 /* const makeIteration = () => {
    console.clear();
    if (this.seconds > 0) {
        console.log(this.seconds);
        this.seconds -= 1;
        setTimeout(makeIteration, 1000);  // 1 second waiting
    } else {
        console.log('Done!');
    }*/  
};

// setTimeout(makeIteration, 1000); 
  
//   // Fetch the email from the query parameters.
//   this.route.queryParams.subscribe((params) => {
//     this.email = params['email'];
//   });

// }

onOtpInput() {
  // Limit the OTP input to numeric characters using regex
  //this.otp = this.otp.replace(/\D/g, '');
}

verifyOtp() {
//function used to verigy the otp that was sent to the email.
const emailOTP: number = this.otp
if(emailOTP==this.sessions.getEmailOTP().number){
  console.log("OTP MATCH");

  this.router.navigate(["/resetpassword"])
}else{
  Swal.fire({
    icon: 'error',
    title: 'Incorrect OTP',
    text: 'Please enter correct OTP sent to your email',
    showConfirmButton: false,
    timer: 3000
  }).then((result) => {
   
  });
}
}

// resends the otp to the email provided incease the response was not received previously
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