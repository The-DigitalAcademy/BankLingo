import { Component, EventEmitter, Output } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Location } from '@angular/common';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})



export class SearchBarComponent {

  queryText = ""
  
  constructor(private core : CoreService, private session : SessionsService, private location: Location){
  }


  searchQuery(){
    this.core.SearchTerm({message : this.queryText}).subscribe(response =>{
      console.log(response, "this the response");
      this.session.saveQueryResponse(response)
      this.session.saveQueryQuestion(this.queryText)
      window.location.reload()


      
    })

  }


}
