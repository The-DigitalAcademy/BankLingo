import { Component, EventEmitter, Output } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';



@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})



export class SearchBarComponent {

  queryText = ""
  // @Output() searchTextEmitter = new EventEmitter<string>();

  // onSearchTextChange() {
  //   this.searchTextEmitter.emit(this.queryText);
  // }
  constructor(private core : CoreService){
  }


  searchQuery(){
    this.core.SearchTerm(this.queryText).subscribe(response =>{
      console.log(response, "this the response");
      
    })

  }


}
