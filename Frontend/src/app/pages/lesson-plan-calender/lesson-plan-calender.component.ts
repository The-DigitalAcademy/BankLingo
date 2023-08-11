import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, DateClickArg } from 'fullcalendar';
import { SessionsService } from 'src/app/services/sessions.service';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';



import { LessonPlan } from 'src/app/types/lessonPlan';



@Component({
  selector: 'app-lesson-plan-calender',
  template: `
  <div *ngIf="UsersService.isLoggedIn()">
    <!-- Your application content here -->
    <button (click)="logout()">Logout</button>
  </div>
  <div *ngIf="!UsersService.isLoggedIn()">
    <!-- Show login page or redirect to login page -->
  </div>`,

  templateUrl: './lesson-plan-calender.component.html',
  styleUrls: ['./lesson-plan-calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LessonPlanCalenderComponent implements OnInit, AfterViewInit {

  //End point to save the duration number
  private apiUrls = 'https://banklingoapi.onrender.com/api/gpt/create';

  user!: any;
  profileForm!: FormGroup;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.apiUrls}` // Add your authentication header here
    })
  };

  formData: any = {
    // Other form fields...
    duration: 0 // Initialize with a default value, update this based on user input
  };

  //private apiUrls = 'http://localhost:4500';

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  events: LessonPlan[] = [

    // Add more events as needed
  ];




//dates selected from the calender
  selectedDates: Date |
    undefined = new Date();

  duration: Date[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: (info) => {
      this.selectedDates = info.date;
    }
  };





  constructor(private http: HttpClient, private formBuilder: FormBuilder,

    private session: SessionsService,private titlePage : Title) { }



  onDateClick(date: Date) {
    const index = this.duration.findIndex(d => d.toISOString() === date.toISOString());
    if (index === -1) {
      this.duration.push(date);
    } else {
      this.duration.splice(index, 1);
    }
  }

  onSaveDate() {

    // nDays:{numDays : number}
    const numberOfDays = this.duration.length;
    const nDays = {
      duration: numberOfDays,
      user_id: this.session.getLoggedUser().userId,
      plan_name: this.session.getQueryQuestion()
    }
    console.log(nDays, "nDays");


    // nDays:{numDays : string}

    // Make a POST request to the backend API to save the number of days

    this.http.post<any>(this.apiUrls, nDays, this.httpOptions).subscribe(
      (response: any) => {
        console.log('Data saved successfully:', response);
        // Do something on successful save
      },


      (error) => {
        if (error.status === 401) {
          console.error('Unauthorized. Please provide valid credentials.');
          // Handle unauthorized access here, show login form, etc.
        } else {
          console.error('Error saving number of days:', error);
          // Handle other errors
        }

      }
    );


  }







  // calendarOptions!: CalendarOptions;



  ngOnInit() {
    this.titlePage.setTitle("Lesson")

    this.initializeCalendar();


    // Retrieve the user data from session storage
    this.user = this.session.getLoggedUser();
    this.user = this.session.getQueryQuestion();




    // Check if the user variable contains valid user data before initializing the form
    if (this.user && Object.keys(this.user).length > 0) {
      this.initializeForm();
    } else {
      // Handle the case when the user data is not available
      console.log('User data not found in session storage');
      // You can take appropriate actions, such as redirecting the user to the login page.
    }
  }


  initializeForm() {





    this.profileForm = this.formBuilder.group({
      user_id: [this.user.name, Validators.required],
      plan_name: [this.user.surname, Validators.required],
      duration: [this.user.duration],

    });
  }

  ngAfterViewInit() {
    // Access the FullCalendarComponent after the view has been initialized
    console.log(this.fullcalendar);
  }

  initializeCalendar() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, interactionPlugin],
      initialView: 'dayGridMonth',
      headerToolbar: {
        left: 'title',
        center: '',
        right: 'prev,next',
      },
      // events: [
      //   //Add your events data here
      //   { title: 'Event 1', date: '2023-08-01' },
      //            { title: 'Event 2', date: '2023-08-05' },
      // ],
      dateClick: this.handleDateClick.bind(this),
    };
  }

  handleDateClick(arg: DateClickArg) {
    // Toggle the class on the clicked day element
    arg.dayEl.classList.toggle('clicked-day');

    // Update the selectedDates array
    const clickedDate = arg.date;
    const index = this.duration.findIndex(date => date.toISOString() === clickedDate.toISOString());
    if (index === -1) {
      this.duration.push(clickedDate);
    } else {
      this.duration.splice(index, 1);
    }
  }

  getSelectedDaysCount() {


    return this.duration.length;
  }

}






