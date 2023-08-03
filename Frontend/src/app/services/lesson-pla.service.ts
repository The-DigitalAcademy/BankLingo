import { Injectable } from '@angular/core';

import { LessonPlan } from '../types/lessonPlan';

@Injectable({
  providedIn: 'root'
})
export class LessonPlaService {

  private lessonPlans: LessonPlan[] = [];
  
  constructor() { }

  getLessonPlans(): LessonPlan[] {
    return this.lessonPlans;
  }

  addLessonPlan(lessonPlan: LessonPlan): void {
    this.lessonPlans.push(lessonPlan);
  }

  updateLessonPlan(lessonPlan: LessonPlan): void {
    const index = this.lessonPlans.findIndex((plan) => plan.plan_id === lessonPlan.plan_id);
    if (index !== -1) {
      this.lessonPlans[index] = lessonPlan;
    }

    // deleteLessonPlan(plan_id: number): void {
    //   this.lessonPlans = this.lessonPlans.filter((plan) => plan.plan_id !== plan_id);
    // }
  }


  
  
}
