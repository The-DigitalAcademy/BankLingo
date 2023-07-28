import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl,FormGroup,Validators ,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';
import { HttpClient } from '@angular/common/http';
import { SessionsService } from 'src/app/services/sessions.service';

const URL = 'http://localhost:4500'


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  user!:any;
  profileForm!: FormGroup
        constructor( private formBuilder: FormBuilder, 
        private usersService: UsersService,
        private session: SessionsService  
        ) {
         
          //private http: HttpClient 
          ) { }


        

          

          ngOnInit(): void {
            //this.getUsers()

          // getUsers() {
          //   this.usersService.getAllUsers().subscribe(products => {
          //     this.users
               
          //   })
        
          //}

          // ngOnInit() {
          // //  this.getUsers()

          // }

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
            
            this.initializeForm();
          }

      

          initializeForm(){
            this.profileForm = this.formBuilder.group({
              name: [this.user.name, Validators.required],
              surname: [this.user.surname, Validators.required],
              age: [this.user.age, Validators.required],
              contact_number: [this.user.contact_number, Validators.required],
              email: [this.user.email, [Validators.required, Validators.email]],
              profile_picture: [this.user.profile_picture],
            });
          }

         

          updaterUser(){
            if (this.profileForm.valid)
            {
              const updatedData = this.profileForm.value;

              // Make sure user.user_id is not undefined
              if (!this.user.userId) {
                console.error('User ID is not defined.' + this.user.userId);
                return;
              }

              console.log('Updating profile with ID:', this.user.userId);
              console.log('Updated data:', updatedData);

              this.usersService.updateProfile(this.user.userId, updatedData).subscribe(res=>{
                this.user = res;
                console.log('success  ' + res);
                
              })
            }
          }


          


        }