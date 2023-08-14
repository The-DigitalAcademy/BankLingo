import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-lesson-plans',
  templateUrl: './lesson-plans.component.html',
  styleUrls: ['./lesson-plans.component.scss']
})
export class LessonPlansComponent implements OnInit {



  constructor(private titlePage : Title, private core : CoreService){}

  ngOnInit(): void {
    this.titlePage.setTitle("Lesson plans")
    //this.core.getActiveLesson()



  }


}
