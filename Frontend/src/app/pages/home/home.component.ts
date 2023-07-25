import { Component, Input, OnInit } from '@angular/core';
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

@Input() activeP?: string;
constructor(private session : SessionsService){}

  ngOnInit(): void {
    this.activeP = "home"
     this.name =  this.session.getLoggedUser().name
     this.surname = this.session.getLoggedUser().surname
     this.img = this.session.getLoggedUser().profile_picture
    this.searchedBefore = this.session.getLoggedUser().searchedbefore
  
    
    

    if(this.searchedBefore==true){
        this.cardLabel = "Recent searched terms"
    }else{
      this.cardLabel = "Absa Fun facts"
    }


  }

  

}
