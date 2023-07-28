import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionsService } from 'src/app/services/sessions.service';
import { UsersService } from 'src/app/services/users.services';
import { Users } from 'src/app/types/users';
import Swal from 'sweetalert2';

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
    private formB : FormBuilder,
    private session : SessionsService
    ) {
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
    
    this.auth.login(this.loginForm.value).subscribe(response => {
        // Handle the successful response here.
        console.log(response,"success");
        this.session.saveLoggedUser(response)
         Swal.fire({
          icon: 'success',
          title: 'Login Successful!',
          text: 'Successfully logged in.',
          confirmButtonColor: '#38A3A5',
          showConfirmButton: false,
          timer: 1400
        }).then((result)=>{
          this.router.navigate(["/home"])
          if (result.value){
         
          }})
        
      },
      (error) => {
        // Handle the error here or display it to the user.
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'User not found',
          text: 'Please enter correct credentials.',
          confirmButtonColor: '#38A3A5',
        })
        
      }
    );
     
   } else {
    this.invalidCredentials = true;
    console.log("Wrong credentials");
   }

  }

}
