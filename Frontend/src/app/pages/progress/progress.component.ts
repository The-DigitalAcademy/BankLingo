import { Component, OnInit, Input } from '@angular/core';
import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { SearchObject } from 'src/app/types/searchObject';


import { SessionsService } from 'src/app/services/sessions.service';




import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { Users } from 'src/app/types/users';

import { HttpClient } from '@angular/common/http';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-progress',
 

  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent {
  user!: any;
  favoutitesArray: SearchObject[] = [];
  user_id = 0
  profileForm!: FormGroup;
  searchedBefore = false
  showSearched = false
  cardLabel = ""
  responseBody = ""
  responseQuestion : any
  isIconFilled = false;


  progressValue = 35;
  maxValue = 100;
  
  constructor(
    private usersService: UsersService,
    private router: Router, 
    private formBuilder: FormBuilder,
     private session: SessionsService,private core : CoreService ) 
     
     {}



  
  ngOnInit() {



    this.searchedBefore = this.session.getLoggedUser().searchedbefore
    this.user_id = this.session.getLoggedUser().userId

  
 
   /**
    * TODO: when user search and its a first time, it must change the searched before to true, so they no longer see the fun facts
    */
   
   if(this.searchedBefore==true){
     this.cardLabel = "Favourite searched terms"
     this.initiateUserHistory()
     this.responseBody = this.session.getQueryResponse().message
     if(this.responseBody.length!=0){
       this.showSearched = true
       this.responseQuestion = this.session.getQueryQuestion()
     }
   }
   else{
     this.cardLabel = "Fun facts about ABSA"
   }

 
   
    //this.searched = this.session.getLoggedUser().searched
   

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

    
  }

  initializeForm() {
    this.profileForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],

   
     
    });
  }

  

  initiateUserHistory(){

    this.core.getLatestFavouriteSearch(this.user_id).subscribe(response =>{
      
      this.favoutitesArray = response
      console.log(this.favoutitesArray[0],"fav array"); 

    })

  }
  updateProgress() {
    this.progressValue += 10;
    if (this.progressValue > this.maxValue) {
      this.progressValue = this.maxValue;
    }
  }

}
