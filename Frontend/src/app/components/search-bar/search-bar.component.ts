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
  humourSwitch = false;

  constructor(private core: CoreService, private session: SessionsService, private location: Location) {
  }

  saveSearch() {

    const search = {
      query_searched: this.responseQuestion,
      response_searched: this.responseBody
    }

    this.core.saveToFavorites(10, search).subscribe(response => {
      Swal.fire({
        icon: 'success',
        title: 'Successfully saved',
        showConfirmButton: false,
        timer: 1300
      }).then((result) => {
        setTimeout(() => {
          window.location.reload()
        }, 500);
      });

    })
  }

  // onSwitchChange() {
  //   console.log('Switch is now ' + (this.humourSwitch ? 'ON' : 'OFF'));
  //   console.log(this.humourSwitch,"humour switch");

  // }

  internalOperations(response: any){
    this.session.saveQueryResponse(response)
    this.session.saveQueryQuestion(this.queryText)
    this.responseBody = this.session.getQueryResponse().message
    this.responseQuestion = this.session.getQueryQuestion()
    
    Swal.fire({
      icon: 'info',
      titleText: this.queryText,
      text: this.responseBody,
      confirmButtonColor: '#38A3A5',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: '<i class="bi bi-hand-thumbs-up-fill"></i> Understood!',
      confirmButtonAriaLabel: 'Thumbs up',
      cancelButtonText: '<i class="bi bi-star-fill"></i> Add to favourites',
      cancelButtonAriaLabel: 'Add to favourites',
      footer: '<a href="lesson-plan-calender">Learn more?</a>'
    }).then((result) => {
      if (result.isConfirmed) {

      } else if (result.isDismissed) {
        this.saveSearch()

      } else {
        console.log('Modal dismissed');
      }
    });

  }

  searchQuery() {

   const searchedB4 = this.session.getLoggedUser().searchedbefore
   


    if (this.humourSwitch) {
      this.core.SearchTermWithHumor({ message: this.queryText }).subscribe(response=>{
        this.internalOperations(response)
      })

    }else{
      this.core.SearchTerm({ message: this.queryText }).subscribe(response=>{
        this.internalOperations(response)
      })
    }

/*
    this.core.SearchTerm({ message: this.queryText }).subscribe(response => {
      this.session.saveQueryResponse(response)
      this.session.saveQueryQuestion(this.queryText)
      this.responseBody = this.session.getQueryResponse().message
      this.responseQuestion = this.session.getQueryQuestion()




      Swal.fire({
        icon: 'info',
        titleText: this.queryText,
        text: this.responseBody,
        confirmButtonColor: '#38A3A5',
        showCloseButton: true,
        showCancelButton: true,
        confirmButtonText: '<i class="bi bi-hand-thumbs-up-fill"></i> Understood!',
        confirmButtonAriaLabel: 'Thumbs up',
        cancelButtonText: '<i class="bi bi-star-fill"></i> Add to favourites',
        cancelButtonAriaLabel: 'Add to favourites',
        footer: '<a href="lesson-plan-calender">Learn more?</a>'
      }).then((result) => {
        if (result.isConfirmed) {

        } else if (result.isDismissed) {
          this.saveSearch()

        } else {
          console.log('Modal dismissed');
        }
      });




    })
    */

  }


}
