import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { W } from '@fullcalendar/core/internal-common';
import { CoreService } from 'src/app/services/core.service';
import { SharedService } from 'src/app/services/shared.service';
import { Lesson, Welcome } from 'src/app/types/TopicsIE';
@Component({
  selector: 'app-testing',
  templateUrl: './testing.component.html',
  styleUrls: ['./testing.component.scss'],
})
export class TestingComponent {
  topics: Welcome[] = [];
  course?: any[] = [];
  localTopics: any;
  localParse!: Welcome;
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
    this.core.getTopicsById(100).subscribe({
      next: (data) => {
        localStorage.setItem('topics', JSON.stringify(data));
      },
      error: (err) => {
        console.log(err);
      },
    });
    const routeParam = this.route.snapshot.paramMap;
    const routeId = String(routeParam.get('day'));

    this.localTopics = localStorage.getItem('topics');
    
    this.localParse = JSON.parse(this.localTopics) as Welcome;
    
    // if (topicsJSON) {
    //   this.topicsObj = JSON.parse(topicsJSON) as Welcome;
    // }

    this.course = this.localParse.topic_description?.course.lessons;
    console.log(this.course);
  }
}
