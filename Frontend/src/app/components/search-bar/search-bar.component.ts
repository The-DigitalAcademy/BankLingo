import { Component, EventEmitter, Output } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})



export class SearchBarComponent {

  queryText = ""
  responseQuestion = ""
  responseBody = ""
  
  constructor(private core : CoreService, private session : SessionsService, private location: Location){
  }

  try(){
console.log("went to try function");

  }

  searchQuery(){
    this.core.SearchTerm({message : this.queryText}).subscribe(response =>{
      console.log(response, "this the response");
      this.session.saveQueryResponse(response)
      this.session.saveQueryQuestion(this.queryText)
     this.responseBody=this.session.getQueryResponse().message
     console.log(this.responseBody,"response in swal");
     
      // 
      Swal.fire({
         icon: 'info',
        titleText: this.queryText,
        text: this.responseBody,
        confirmButtonColor: '#38A3A5',

        // footer: '<a href="home">Save to favourite searches?</a>',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText:
          '<i class="bi bi-hand-thumbs-up-fill"></i> Understood!',
        confirmButtonAriaLabel: 'Thumbs up',
        cancelButtonText:
          '<i class="bi bi-star-fill"></i> Add to favourites' ,
        cancelButtonAriaLabel: 'Add to favourites'
        
      }).then((result)=>{
        if (result.value){
          window.location.reload()
          console.log(result.value, "value pressed is this from swagger");
          

        }})


      
    })

  }


}
