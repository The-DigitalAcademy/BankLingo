import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';


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
  cardLabel = ""
  responseBody = ""



@Input() activeP?: string;
constructor(private session : SessionsService, private core : CoreService){}

searchText: string = '';

// onSearchTextChange(searchText: string) {
//   this.searchText = searchText;
//   // Perform any operations with the entered text here.
//   console.log('Entered text:', this.searchText);
// }

  ngOnInit(): void {
     this.name =  this.session.getLoggedUser().name
     this.surname = this.session.getLoggedUser().surname
     this.img = this.session.getLoggedUser().profile_picture
    this.searchedBefore = this.session.getLoggedUser().searchedbefore
  
    
    

    if(this.searchedBefore==true){
      this.cardLabel = "Recent searched terms"
      
      this.responseBody = this.session.getQueryResponse().message


      
        

    }else{
      this.cardLabel = "Fun facts about ABSA"
    }


  }





  

}
