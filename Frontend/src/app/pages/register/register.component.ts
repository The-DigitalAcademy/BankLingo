import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  fb!:FormGroup;
  users!:Users;

        constructor(
          private usersService: UsersService,
          private router: Router,
          ) { }

          ngOnInit(){

            this.fb = new FormGroup({
      
              name: new FormControl(null,[Validators.required,Validators.min(3)]),
              surname:new FormControl(null,[Validators.required,Validators.min(3)]), 
              age:new FormControl(null,[Validators.required,this.ageValidator]),
              email:new FormControl(null,[Validators.required,Validators.email]),
              password:new FormControl(null,[Validators.required,Validators.min(8),this.passwordValidator]),
            });
          }

    passwordValidator(control:FormControl):{[key:string]:boolean}|null{
            const value : string = control.value;
            const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value);
            const hasNumber = /\d/.test(value);
            const hasLetter = /[a-zA-Z]/.test(value);
      
            if (!hasSymbol||!hasNumber||!hasLetter){
              return {invalidPassword:true};
            }
              return null;
    }

    ageValidator(control: AbstractControl): { [key: string]: boolean } | null {
      const value: string = control.value;
      // Check if the value is numeric and has exactly 3 digits
      if (!/^\d{2,3}$/.test(value)) {
        return { invalidAge: true };
      }
      return null;
    }
  

          onSubmit() {
            this.registerUser();
          }
          
      
              registerUser()
              {

                if (this.fb.valid) {   
                this.usersService.createUser(this.fb.value).subscribe(res=>{
                 this.users=res;
                    console.log(res);
                });
                  this.router.navigate(['/login']); 
                      console.log("Register successful");       
              }
              else{
                console.log("Registration unsuccessful"); 
              }
              }

            

}
