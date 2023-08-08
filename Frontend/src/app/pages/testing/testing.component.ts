import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';
import { SharedService } from 'src/app/services/shared.service';
import { Topics } from 'src/app/topics-mock-data';
import { Lesson, Welcome } from 'src/app/types/TopicsIE';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent {
  topics: Welcome[] = Topics;
  course: Lesson[] = [];
  topicsObj:any;
  coveredStatus: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private core: CoreService
  ) {
    this.sharedService.cardCoveredStatus$.subscribe((status) => {
      this.coveredStatus = status;
    });
  }
  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    const routeId = String(routeParam.get('day'));
    this.core.getTopicsById(100).subscribe({
      next: (data) => {
        localStorage.setItem('topics', JSON.stringify(data));
      },
      error: (err) => {
        console.log(err);
      },
    }); 
  

    // if (topicsJSON) {
    //   this.topicsObj = JSON.parse(topicsJSON) as Welcome;
    // }
   
    // this.course = this.topicsObj[0].topic_description.course.lessons;
    // console.log(this.course);
  }
}
