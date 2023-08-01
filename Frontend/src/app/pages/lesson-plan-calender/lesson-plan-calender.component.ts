import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, DateClickArg } from 'fullcalendar';
import { HttpClient } from '@angular/common/http';
import { LessonPlan } from 'src/app/types/lessonPlan';



@Component({
  selector: 'app-lesson-plan-calender',
  templateUrl: './lesson-plan-calender.component.html',
  styleUrls: ['./lesson-plan-calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LessonPlanCalenderComponent implements OnInit, AfterViewInit {

  private apiUrls = 'https://banklingoapi.onrender.com';

  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  events: LessonPlan[] = [
   
    // Add more events as needed
  ];

  

  duration: Date |
   undefined = new Date();

   selectedDates: Date[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: (info) => {
      this.duration = info.date;
    }
  };


  constructor(private http: HttpClient) { }

  

  onDateClick(date: Date) {
    const index = this.selectedDates.findIndex(d => d.toISOString() === date.toISOString());
    if (index === -1) {
      this.selectedDates.push(date);
    } else {
      this.selectedDates.splice(index, 1);
    }
  }

  onSaveDate() {
    const numberOfDays = this.selectedDates.length;
    // Make a POST request to the backend API to save the number of days
    this.http.post('${this.apiUrls}/api/gpt/create', { numberOfDays }).subscribe(
      (response: any) => {
        console.log(response.message);
      },
      (error) => {
        console.error('Error saving number of days:', error);
      }
    );
    
  } 

 // calendarOptions!: CalendarOptions;

  ngOnInit() {
    this.initializeCalendar();
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
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
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
    const index = this.selectedDates.findIndex(date => date.toISOString() === clickedDate.toISOString());
    if (index === -1) {
      this.selectedDates.push(clickedDate);
    } else {
      this.selectedDates.splice(index, 1);
    }
  }

  getSelectedDaysCount() {
    return this.selectedDates.length;
  }

  }
 





