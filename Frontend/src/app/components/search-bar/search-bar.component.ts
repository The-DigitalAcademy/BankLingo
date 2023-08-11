import {
  Component,
  EventEmitter,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';


declare var $: any;
declare var webkitSpeechRecognition: any;

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  queryText = '';
  responseQuestion = '';
  responseBody = '';
  humourSwitch = false;
  user_id = 0;

  //Web speech
  recognition: any;
  isRecognizing = false;
  content?: any;
  browserSupport: boolean = false;

  constructor(
    private core: CoreService,
    private session: SessionsService,
    private location: Location,
    private renderer: Renderer2
  ) {
    const microContainer = document.querySelector('.microphonebox');
    if ('webkitSpeechRecognition' in window) {
      this.browserSupport = true;
      this.recognition = new webkitSpeechRecognition(); // SpeechRecognition
      this.recognition.continuous = true;

      this.recognition.onstart = () => {
        this.isRecognizing = true;
      };

      this.recognition.onspeechend = () => {
        this.isRecognizing = false;
      };

      this.recognition.onerror = () => { };

      this.recognition.onresult = async (event: any) => {
        var current = event.resultIndex;
        var transcript = await event.results[current][0].transcript;
        console.log(transcript);
        this.queryText = transcript;
      };
    } else {
      this.browserSupport = false;
    }
  }
  ngOnInit(): void {
    this.user_id = this.session.getLoggedUser().userId;
    this.queryText;
  }

  saveSearch() {
    const search = {
      query_searched: this.responseQuestion,
      response_searched: this.responseBody,
      ishumour: this.humourSwitch,
    };

    this.core.saveToFavorites(this.user_id, search).subscribe((response) => {
      Swal.fire({
        icon: 'success',
        title: 'Successfully saved',
        showConfirmButton: false,
        timer: 1300,
      }).then((result) => {
        setTimeout(() => {
          window.location.reload();
        }, 500);
      });
    });
  }

  internalOperations(response: any) {
    this.session.saveQueryResponse(response);
    this.session.saveQueryQuestion(this.queryText);
    this.responseBody = this.session.getQueryResponse().message;
    this.responseQuestion = this.session.getQueryQuestion();

    Swal.fire({
      icon: 'info',
      titleText: this.queryText,
      text: this.responseBody,
      confirmButtonColor: '#38A3A5',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText:
        '<i class="bi bi-hand-thumbs-up-fill"></i> Add to favourites!',
      confirmButtonAriaLabel: 'Thumbs up',
      cancelButtonText: '<i class="bi bi-star-fill"></i> Understood!',
      cancelButtonAriaLabel: 'Understood!',
      footer: '<a href="lesson-plan-calender">Learn more?</a>',
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveSearch();
      } else if (result.isDismissed) {
        console.log('Modal dismissed');
      } else {
        console.log('Modal dismissed');
      }
    });
  }

  searchQuery() {
    const searchedB4 = this.session.getLoggedUser().searchedbefore;
    if (searchedB4 == false) {
      const firstSearch = {
        searchedbefore: true,
        email: this.session.getLoggedUser().email,
      };
      this.core.updateSearchedBefore(firstSearch).subscribe((response) => {
        
        this.session.updateUserFirstTimeSearch();
      //  window.location.reload()
      });
    }

    if (this.humourSwitch) {
      this.humourSwitch = true;
      this.core
        .SearchTermWithHumor({ message: this.queryText })
        .subscribe((response) => {
          this.internalOperations(response);
        });
    } else {
      this.humourSwitch = false;
      this.core.SearchTerm({ message: this.queryText }).subscribe((response) => {
          this.internalOperations(response);
        });
    }
  }

  startRecognition() {
    if (!this.isRecognizing) {
      this.isRecognizing = true;
      this.recognition.start();
    }
  }

  stopRecognition() {
    this.recognition.stop();
    this.isRecognizing = false;
    this.queryText = this.queryText;
    setTimeout(this.stopRecognition, 1000);
  }

  onTextboxInput(event: Event) {
    this.queryText = (event.target as HTMLTextAreaElement).value;
  }
}
