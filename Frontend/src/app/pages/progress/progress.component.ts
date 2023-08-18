import { Component, Input, OnInit } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';
import { Users } from 'src/app/types/users';
import { UsersService } from 'src/app/services/users.services';
import { Router } from '@angular/router';
import { FormGroup,Validators,FormBuilder} from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { LessonPlan } from 'src/app/types/lessonPlan';


@Component({
  selector: 'app-progress',
 templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})

export class ProgressComponent implements OnInit{

   lessonsWithZeroProgress: any[] = []; 
  zeroProgressCount: number = 0;
  startedProgressCount:number=0;
  countTaskCompleted:number=0;


  progressValue = 0;
  days_count = 0;
  duration = 0;
  
  processedData: any[] = [];
//Variables for progress bar
  progressWidth = 0;
  ariaValueNow = 0;
  ariaValueMin = 0;
  ariaValueMax = 100;

  lessonCount: number = 0;



  user!: any;
  plan!:any;
  lessonss!:any;
  profileForm!: FormGroup;
  loggedUser : Users | undefined
  name : string | undefined
  surname : string | undefined
  img : string | undefined
  
  
  user_id = 0
  plan_id=0
 
  
  

  constructor (private session : SessionsService, private core : CoreService,
    private usersService: UsersService,private titlePage: Title,
    private router: Router, private formBuilder: FormBuilder){}

  
 ngOnInit(): void {
    this.titlePage.setTitle("Progress")
   this.user_id = this.session.getLoggedUser().userId
    this.user = this.session.getLoggedUser();

    //get items for lessonplan to show the progress
    this.core.getItems(this.user_id).subscribe(user => {
      this.progressWidth = user.progress;
      this.ariaValueNow = this.progressWidth;
    });

    //function of progress bar
    this.calculateProgress();
    this.countProgress();
    this.countProgressStarted();
   this.countTaskCompletedd();


//Count the number of lesson the user have
    const user_Id = 0; 
    this.core.getAllUserLessons(user_Id).subscribe(lessons => {
      this.lessonCount = lessons.length;
    });
 

}

initializeForm() {
  this.profileForm = this.formBuilder.group({
    name: [this.user.name, Validators.required],
    surname: [this.user.surname, Validators.required],
    duration:[this.lessonss.duration,Validators.required],
    days_count:[this.lessonss.nDays,Validators.required],
    plan_name:[this.lessonss.plan_name,Validators.required]
  
  });
}


  //Count task with 0% progress
    countProgress() {
      
      const plan_name=this.core.getItems;

      this.core.getItems(this.user_id).subscribe((dataArray: LessonPlan[]) => {
        dataArray.forEach((data: LessonPlan) => {
          const duration = data.duration;

      
          const progressValue = (data.days_count / duration) * 100;
  
          if (progressValue === 0) {
            this.lessonsWithZeroProgress.push(data);
            this.zeroProgressCount++;
          }
        });
      });
    }
   
//Count task that the user started but not finished
countProgressStarted() {
  const plan_name = this.core.getItems;

  this.core.getItems(this.user_id).subscribe((dataArray: LessonPlan[]) => {
    dataArray.forEach((data: LessonPlan) => {
      const duration = data.duration;
      const progressValue = (data.days_count / duration) * 100;

      if (progressValue > 0 && progressValue < 100) {
        this.lessonsWithZeroProgress.push(data);
        this.startedProgressCount++;
      }
    });
  });
}

countTaskCompletedd() {
  const plan_name = this.core.getItems;

  this.core.getItems(this.user_id).subscribe((dataArray: LessonPlan[]) => {
    dataArray.forEach((data: LessonPlan) => {
      const duration = data.duration;
      const progressValue = (data.days_count / duration) * 100;

      if (progressValue=== 100) {
        this.lessonsWithZeroProgress.push(data);
        this.countTaskCompleted++;
      }
    });
  });
}
   
     
//Progress bar status code

     calculateProgress() {
    
      const plan_name=this.core.getItems;

      this.core.getItems(this.user_id).subscribe((dataArray: LessonPlan[]) => {
        dataArray.forEach((data: LessonPlan) => {
          const duration = data.duration;
          
          const progressValue = (data.days_count / duration) * 100;
          
          console.log(progressValue, "progress value");
          console.log(data, "our data");
          console.log(duration, "dura");
          console.log(plan_name,"name")
          
          
          this.processedData.push({ progressValue, data, duration,plan_name});
        });
      });
     
    }
  
}
 

