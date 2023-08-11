import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';
import { SearchObject } from 'src/app/types/searchObject';
import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-progress',
 

  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit{
  
  constructor(private session : SessionsService, private core : CoreService,
    private usersService: UsersService,
    private router: Router, private formBuilder: FormBuilder,
    ){}


  user!: any;
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



  ngOnInit(): void {
    this.name =  this.session.getLoggedUser().name
    this.surname = this.session.getLoggedUser().surname
    this.img = this.session.getLoggedUser().profile_picture
    
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
  }else{
    this.cardLabel = "Fun facts about ABSA"
    
  }

}

initializeForm() {
  this.profileForm = this.formBuilder.group({
    name: [this.user.name, Validators.required],
    surname: [this.user.surname, Validators.required],
    
    profile_picture: [this.user.profile_picture],
  });
}


    initiateUserHistory(){

      this.core.getLatestFavouriteSearch(this.user_id).subscribe(response =>{
        
        this.favoutitesArray = response
        
        console.log(this.favoutitesArray[0],"fav array"); 

      })

    }
    
 
}
