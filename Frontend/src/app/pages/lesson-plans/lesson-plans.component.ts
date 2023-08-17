import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { SessionsService } from 'src/app/services/sessions.service';

@Component({
  selector: 'app-lesson-plans',
  templateUrl: './lesson-plans.component.html',
  styleUrls: ['./lesson-plans.component.scss']
})
export class LessonPlansComponent implements OnInit {


  user_id = this.session.getLoggedUser().userId
   allPlans : any[]=[]


  constructor(private titlePage : Title,
     private core : CoreService, 
     private session : SessionsService,
     ){}

  ngOnInit(): void {
    this.titlePage.setTitle("Lesson plans")

    
    this.core.getAllUserLessons(this.user_id).subscribe(data=>{

      this.allPlans=data
      console.log(this.allPlans,"the data inside");
      
    })



  }


}
