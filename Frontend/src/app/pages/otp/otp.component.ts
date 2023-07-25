import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent {
  email!: string;
  otp?: number;
  strOTP : string =""
  emailOtp  = ""

  first : string =""
   second : string =""
   third : string =""
   forth : string =""

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UsersService,
    private sessions : SessionsService
  ) {}

  

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.email = params['email'];
    });
  }

  onSubmit(): void {
  this.emailOtp =  String(this.otp);
  console.log(this.otp,"this opt");
  
this.combineOTP()
console.log(this.emailOtp,"emailOTP");
console.log(this.strOTP,"strOTP");


this.verifyOTP(this.email,this.emailOtp,this.strOTP)
}

combineOTP() {
  this.strOTP = this.first+this.second+this.third+this.forth
  
}

verifyOTP(email: string, otp: string, userOTP: string){

  if(otp==userOTP){
console.log("otp matches");
  }else{
    console.log("otp do not matches");

  }
}


}