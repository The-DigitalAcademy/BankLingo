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
  isLoading:boolean = false;
  coveredStatusArray: boolean[] = [true];
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
    this.isLoading = true;
    this.core.getTopicsById(94).subscribe({
      next: (data) => {
        // Instead of storing in localStorage, you can directly process the data here
        const topicsData = data as unknown as Welcome; // Assuming Welcome is the type of your data
        this.course = topicsData.topic_description?.course.lessons;
        this.isLoading = false;
        localStorage.setItem('topics', JSON.stringify(data));
        console.log(this.course);
      },
      error: (err) => {
        console.log(err);
      },
    });

    this.course?.forEach(card => {
      this.coveredStatusArray.push(card.covered);
    })
  
    const routeParam = this.route.snapshot.paramMap;
    const routeId = String(routeParam.get('day'));

 

    
    // if (topicsJSON) {
    //   this.topicsObj = JSON.parse(topicsJSON) as Welcome;
    // }


  }
}
