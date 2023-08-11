import { Component, OnInit, AfterViewInit, ViewChild, ViewEncapsulation} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { FullCalendarComponent } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarOptions, DateClickArg } from 'fullcalendar';
import { SessionsService } from 'src/app/services/sessions.service';
import { AbstractControl, FormControl, FormGroup,Validators, FormBuilder,} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LessonPlan } from 'src/app/types/lessonPlan';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-lesson-plan-calender',
  template: ` <div *ngIf="UsersService.isLoggedIn()">
      <!-- Your application content here -->
      <button (click)="logout()">Logout</button>
    </div>
    <div *ngIf="!UsersService.isLoggedIn()">
      <!-- Show login page or redirect to login page -->
    </div>`,
  templateUrl: './lesson-plan-calender.component.html',
  styleUrls: ['./lesson-plan-calender.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LessonPlanCalenderComponent implements OnInit, AfterViewInit {


 

  user!: any;
  profileForm!: FormGroup;



  formData: any = {
    duration: 0, // Initialize with a default value, update this based on user input
  };
  isLoading = false
  events: LessonPlan[] = [];
  selectedDates: Date | undefined = new Date();
  duration: Date[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    dateClick: (info) => {
      this.selectedDates = info.date;
    },
  };
    updateBtn="Generate Lesson Plan";


<<<<<<< HEAD



  constructor(private http: HttpClient, private formBuilder: FormBuilder,

    private session: SessionsService,) { }

   
=======
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private session: SessionsService,
    private titlePage: Title,
    private router: Router,
    private core : CoreService
  ) { }
>>>>>>> develop

  onDateClick(date: Date) {
    const index = this.duration.findIndex(
      (d) => d.toISOString() === date.toISOString()
    );
    if (index === -1) {
      this.duration.push(date);
    } else {
      this.duration.splice(index, 1);
    }
  }

  onSaveDate() {
    const numberOfDays = this.duration.length;
    const lessonPlan = {
      duration: numberOfDays,
      user_id: this.session.getLoggedUser().userId,
      plan_name: this.session.getQueryQuestion(),
    };

    this.isLoading=true
    this.updateBtn="Saving plan"
 this.core.saveLessonPlan(lessonPlan).subscribe(response=>{

        this.updateBtn="Generating topics"
        console.log('Data saved successfully:', response);

        const prompt = {
          plan_id: response.plan_id,
          plan_name: response.duration,
          duration: this.session.getQueryQuestion(),
        };


        this.core.generateTopics(prompt).subscribe(data=>{
          console.log(data, "Topics generated");
          this.updateBtn = "Generate Lesson Plan"
          this.isLoading=false
        })
        




       
       // this.router.navigate(["/lesson-plans"])

      },

      (error) => {
        this.isLoading=false
        if (error.status === 401) {
          console.error('Unauthorized. Please provide valid credentials.');
        } else if(error.status==409){

          Swal.fire({
            icon: 'error',
            titleText: "Lesson already exist",
            text: "Would you like to jump to your lesson plan?",
            confirmButtonColor: '#38A3A5',
            showCloseButton: true,
            showCancelButton: true,
            confirmButtonText:'Yes',
            cancelButtonText: 'No',
          
          }).then((result) => {
            if (result.isConfirmed) {
              this.router.navigate(["/lesson-plans"])
            } else if (result.isDismissed) {
              console.log('Modal dismissed');
            } else {
              console.log('Modal dismissed');
            }
          });

          console.error('Error saving number of days:', error);
        }
      }
    );
  }

  // calendarOptions!: CalendarOptions;

  ngOnInit() {
    this.titlePage.setTitle('Lesson');

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
    // console.log(this.fullcalendar);
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

      dateClick: this.handleDateClick.bind(this),
    };
  }

  handleDateClick(arg: DateClickArg) {
    // Toggle the class on the clicked day element
    arg.dayEl.classList.toggle('clicked-day');


    const selectedDate = new Date(arg.dateStr);
  
      // Check if the selected date is in the past
      if (selectedDate < new Date()) {
        alert('Cannot create lesson plan with the past date, choose the current date or future date.');
        return;
      }

    // Update the selectedDates array
    const clickedDate = arg.date;
    const index = this.duration.findIndex(
      (date) => date.toISOString() === clickedDate.toISOString()
    );
    if (index === -1) {
      this.duration.push(clickedDate);
    } else {
      this.duration.splice(index, 1);
    }
  }

  getSelectedDaysCount() {
    return this.duration.length;
  }
<<<<<<< HEAD





 

=======
>>>>>>> develop
}
