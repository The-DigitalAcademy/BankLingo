import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { response } from 'express';
import { PasswordServiceService } from 'src/app/services/password-service.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';

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
  generatedOTP!:number;
  user!:Users;
  emailOTP! : number

  constructor(private router: Router, private userService: UsersService, private sessions : SessionsService, private passwordService: PasswordServiceService) {}

  ngOnInit(): void {
    
  }

  // onSubmit(): void {
  //   // Get the email value from the form control
  //   const email = this.form.get('email')?.value;
  //   if (email) {
  //     // Ensure email is not null or undefined before making the API call
  //     console.log(email);
      
  //     this.passwordService.sendOtp(email).subscribe(
  //       response => {
  //         console.log(response);
          
  //         // OTP sent successfully, navigate to OTP verification page
  //        // this.router.navigate(['/otp'], { queryParams: { email } });
  //         this.router.navigate(['/otp'], { queryParams: { email } });
  //       },
  //       (error) => {
  //         // Handle OTP sending failure, show error message
  //         console.error('Error sending OTP:', error);
  //         // You can display an error message on the UI here
  //       }
  //     );
  //   } else {
  //     // Handle the case when the email is empty or not provided
  //     console.error('Email is empty or not provided.');
  //     // You can display an error message on the UI here
  //   }
  // }


  
  
  
  
  //function will be initialized when pressing the submit button
  
  
  onSubmit(){
    //function will be initialized when pressing the submit button
    const { email } = this.form.value;

   // setTimeout(() =>  this.gotoOtp() , 1000);


    this.passwordService.sendOtp(email).subscribe( response =>{


        this.sessions.saveEmailOTP(response);
       
        
       this.router.navigate(["/otp"])
    })
  }

//sending otp function
  sendOtp() {

    const email = this.form.get('email')?.value;
    if (email) {
      // Ensure email is not null or undefined before making the API call
      console.log(email);
    this.passwordService.sendOtp(email).subscribe(
      res => {
        console.log(res,"this one");
        
        // OTP sent successfully, handle success or redirect to OTP component
       // this.router.navigateByUrl('/otp?email=' + encodeURIComponent(email));
      },
      (error) => {
        // Handle error (e.g., show error message)
      }

    );
  }
  }
  
  }
