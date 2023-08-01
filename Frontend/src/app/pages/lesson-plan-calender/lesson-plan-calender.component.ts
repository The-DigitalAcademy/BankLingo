import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, DateClickArg } from 'fullcalendar';



@Component({
  selector: 'app-lesson-plan-calender',
  templateUrl: './lesson-plan-calender.component.html',
  styleUrls: ['./lesson-plan-calender.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LessonPlanCalenderComponent implements OnInit, AfterViewInit {
  @ViewChild('fullcalendar') fullcalendar!: FullCalendarComponent;

  calendarOptions!: CalendarOptions;

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
      events: [
        // Add your events data here
        // Example: { title: 'Event 1', date: '2023-08-01' },
        //          { title: 'Event 2', date: '2023-08-05' },
      ],
      dateClick: this.handleDateClick.bind(this),
    };
  }

  handleDateClick(arg: DateClickArg) {
    // Toggle the class on the clicked day element
    arg.dayEl.classList.toggle('clicked-day');
    console.log('clicked');

  }
 
}




