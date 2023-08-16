import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';
import { SearchObject } from 'src/app/types/searchObject';

import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';
import {
 
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LessonPlan } from 'src/app/types/lessonPlan';

@Component({
  selector: 'app-progress',
 

  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit{

  messageText = "No favourites search terms yet";
  showMessage = false;

  progressValue = 0;
  nDays = 0;
  duration = 0;
  

//Variables for progress bar
  progressWidth = 0;
  ariaValueNow = 0;
  ariaValueMin = 0;
  ariaValueMax = 100;

  lessonCount: number = 0;


  user!: any;
  lessonss!:any;
  profileForm!: FormGroup;
  loggedUser : Users | undefined
  name : string | undefined
  surname : string | undefined
  img : string | undefined
  searchedBefore = false
  showSearched = false
  cardLabel = ""
  responseBody = ""
  responseQuestion : any
  isIconFilled = false;
  favoutitesArray: SearchObject[] = [];
  user_id = 0
  favouritesData: any;
  
  

  constructor (private session : SessionsService, private core : CoreService,
    private usersService: UsersService,private titlePage: Title,
    private router: Router, private formBuilder: FormBuilder){}

  
 ngOnInit(): void {
    this.titlePage.setTitle("Progress")
    this.searchedBefore = this.session.getLoggedUser().searchedbefore
    this.user_id = this.session.getLoggedUser().userId

    //get items for lessonplan to show the progress
    this.core.getItems(this.user_id).subscribe(user => {
      this.progressWidth = user.progress;
      this.ariaValueNow = this.progressWidth;
    });

    //function of progress bar
    this.calculateProgress();



//Count the number of lesson the user have
    const user_Id = 0; 
    this.core.getAllUserLessons(user_Id).subscribe(lessons => {
      this.lessonCount = lessons.length;
    });
  
 
   //Check if the user has searched a term before
   
  
   if(this.searchedBefore==true)
   {
    this.cardLabel = "Favourite searched terms"
    this.initiateUserHistory()

    this.responseBody = this.session.getQueryResponse().message
    if(this.responseBody.length!=0){
      this.showSearched = true
      this.responseQuestion = this.session.getQueryQuestion()
    }
  }else{
    this.messageText;
    
  }

  this.user = this.session.getLoggedUser();


  // Check if the user variable contains valid user data before initializing the form
  if (this.user && Object.keys(this.user).length > 0) {

    console.log('User data not found in session storage');
    // You can take appropriate actions, such as redirecting the user to the login page.
  }

}

initializeForm() {
  this.profileForm = this.formBuilder.group({
    name: [this.user.name, Validators.required],
    surname: [this.user.surname, Validators.required],
    duration:[this.lessonss.duration,Validators.required],
    nDays:[this.lessonss.nDays,Validators.required],
  
   



  });
}

//Getting favourite term searched of the user

    initiateUserHistory(){

      this.core.getLatestFavouriteSearch(this.user_id).subscribe(response =>{
        
        this.favoutitesArray = response
        
        console.log(this.favoutitesArray[0],"fav array"); 

      })

      

    }

    //
  

   

   
     
//Progress status code

     calculateProgress() {

     
      
  
      this.core.getItems(this.user_id).subscribe(data => {
        this.duration = data[0].duration;
        this.progressValue = (this.nDays / this.duration) * 100;
        console.log(this.progressValue, "progress value");
        console.log(data[0], "our data");
      });
    }
    }
  
  
 

