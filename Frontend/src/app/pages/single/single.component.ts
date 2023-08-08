import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { da } from 'date-fns/locale';
import { CoreService } from 'src/app/services/core.service';
import { SharedService } from 'src/app/services/shared.service';
import { Topics } from 'src/app/topics-mock-data';
import { Welcome, Lesson } from 'src/app/types/TopicsIE';

@Component({
  selector: 'app-single',
  templateUrl: './single.component.html',
  styleUrls: ['./single.component.scss'],
})
export class SingleComponent {
  topics: Welcome[] = Topics;
  course: Lesson[] = [];
  particularDay: Lesson[] = [];
  someTopics: any;
  currentIndex: number = 0;
  Message: string = ' ';
  loading: boolean = false;
  allTopicsCoveredForCard: boolean = false;
  constructor(private route: ActivatedRoute, private core: CoreService, private sharedService: SharedService) {}
  ngOnInit() {
    //Get the current paramenter
    const routeParam = this.route.snapshot.paramMap;
    const routeId = String(routeParam.get('day'));

    // Put the data into a variable.
    this.course = this.topics[0].topic_description.course.lessons;

    //Loop through the course
    this.course.forEach((item) => {
      if (item.day === routeId) {
        this.particularDay.push(item);
      }
    });
    // Topics under a certain lesson plan, as an array
    this.someTopics = this.particularDay[0].topics;

    //Create an object to be sent over to the request
    let message = {
      message: this.someTopics[0],
    };
    // Start spinner

    this.loading = true;

    this.core.askGPTinsideTopic(message).subscribe({
      next: (data) => {
        this.Message = data.message;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      },
    });
  }

  async navigateToNextTopic(): Promise<void> {
    this.loading = true;
    if (this.currentIndex < this.someTopics.length - 1) {
      this.currentIndex++;
      let message = {
        message: this.someTopics[this.currentIndex],
      };
      console.log(message);

      await this.core.askGPTinsideTopic(message).subscribe({
        next: (data) => {
          this.Message = data.message;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }

    if (this.currentIndex === this.someTopics.length - 1) {
      this.allTopicsCoveredForCard = true;
      this.sharedService.setCardCoveredStatus(true);
      
      // Update the covered status in the course array
      this.course.forEach((lesson) => {
        if (lesson.day === this.particularDay[0].day) {
          lesson.covered = true;
        }
      });
    }
    
  }

  async navigateToPreviousTopic(): Promise<void> {
    this.loading = true;
    if (this.currentIndex > 0) {
      this.currentIndex--;
      let message = {
        message: this.someTopics[this.currentIndex],
      };

      await this.core.askGPTinsideTopic(message).subscribe({
        next: (data) => {
          this.Message = data.message;
          this.loading = false;
        },
        error: (err) => {
          this.loading = false;
        },
      });
    }
    this.allTopicsCoveredForCard = false;
  }
}