import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl,FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{

  
 
  users?: Users;

  user:Users[]=[]
  
 

        constructor(
          private usersService: UsersService,
          private router: Router,
         
          private http: HttpClient 
          ) { }

          // getUsers() {
          //   this.usersService.getAllUsers().subscribe(products => {
          //     this.users
               
          //   })
        
          //}

          ngOnInit(): void {
          //  this.getUsers()
          }

          updateProducts(data:any , _id: string) {


            let body = {
             
        
                 


                
    name: data.name,
    surname: data.surname,
    age: data.age,
    email: data.email,
    //password: data.name,
    contact_number: data.contact_number,
    profile_picture: data.name,
    //created_date: Date;
   // updated_date: Date;
                }
                console.log(body,"this the body");
                
            // this.usersService.updateData(body,_id).subscribe(data=>{
            //   this.users=data
            // })
           // window.location.reload()
          }
          

   

   

          

  

}
