import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';
import { SearchObject } from 'src/app/types/searchObject';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


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
  favoutitesArray: SearchObject[] = []



@Input() activeP?: string;
constructor(private session : SessionsService, private core : CoreService){}

searchText: string = '';


  ngOnInit(): void {
     this.name =  this.session.getLoggedUser().name
     this.surname = this.session.getLoggedUser().surname
     this.img = this.session.getLoggedUser().profile_picture
    this.searchedBefore = this.session.getLoggedUser().searchedbefore
  
    
    
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


  saveSearch() {

    this.isIconFilled = !this.isIconFilled;
    const search = { 
      query_searched: this.responseQuestion,
      response_searched: this.responseBody
      }
    this.core.saveToFavorites(10,search).subscribe(response =>{
      console.log(response,"saving to db");
      
    })
    }


    initiateUserHistory(){

      this.core.getLatestFavouriteSearch(10).subscribe(response =>{
        
        this.favoutitesArray = response


        console.log(this.favoutitesArray, " got favourite searches");
      })

    }



}
