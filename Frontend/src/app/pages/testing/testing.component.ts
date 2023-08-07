import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  course: Lesson[] = []
  coveredStatus: boolean = false;
  constructor(private route: ActivatedRoute, private sharedService: SharedService) {

    this.sharedService.cardCoveredStatus$.subscribe(status => {
      this.coveredStatus = status;
    });
  }
  ngOnInit() {
    const routeParam = this.route.snapshot.paramMap;
    const routeId = String(routeParam.get('day'));
    this.course = this.topics[0].topic_description.course.lessons;
    console.log(this.course)
  
  }

}
