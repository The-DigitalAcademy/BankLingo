import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';
import Swal from 'sweetalert2';


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
      if(this.responseBody.length!=0){
        this.showSearched = true
        this.responseQuestion = this.session.getQueryQuestion()
        // Swal.fire({
        //   // icon: 'success',
        //   title: this.responseQuestion,
        //   text: this.responseBody,
        //   confirmButtonColor: '#38A3A5',
        // }).then((result)=>{
        //   if (result.value){
        //   }})
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


    

}
