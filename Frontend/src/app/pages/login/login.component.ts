import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  loginForm!:FormGroup;
  users!: Users;
  email!: string;
  invalidCredentials = false;

  constructor( private auth: UsersService,
    private router: Router,
    private formB : FormBuilder,) {
      this.loginForm=this.formB.group({
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required]],
      });
    }

  ngOnInit() {

    this.invalidCredentials = false;
  }

  onLogin() {

    if (this.loginForm.valid) {       // Form is valid, perform login logic      
      this.auth.login(this.loginForm.value).subscribe(res=>{
        this.router.navigate(['/home']); 
        console.log("success");  

      const user = { email: this.email };        
      localStorage.setItem('currentUser', JSON.stringify(user));             
    })  
     
   } else {
    this.invalidCredentials = true;
    console.log("Wrong credentials");
   }

  }

}
