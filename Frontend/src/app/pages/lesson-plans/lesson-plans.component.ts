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
  allPlans: any[] = []
  percentComplete: number[] = []
  progressStatus: string[] = []


  constructor(private titlePage: Title,
    private core: CoreService,
    private session: SessionsService,
  ) { }

  ngOnInit(): void {
    this.titlePage.setTitle("Lesson plans")


    this.core.getAllUserLessons(this.user_id).subscribe(data => {

      this.allPlans = data
      this.allPlans.forEach(element => {
        const percent = (element.days_count / element.duration) * 100
        switch (percent) {
          case 0:
            this.progressStatus.push("Not yet started")
            break;
          case 100:
            this.progressStatus.push("Completed")
            break;
          default:
            this.progressStatus.push("In progress")


        }

        this.percentComplete.push((element.days_count / element.duration) * 100)



      });

      console.log(this.allPlans, "the data inside");

    })



  }


}