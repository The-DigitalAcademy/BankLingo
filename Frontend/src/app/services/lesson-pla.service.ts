import { Injectable } from '@angular/core';

import { LessonPlan } from '../types/lessonPlan';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { loggedUser } from '../types/LoggedUser';
import { SessionsService } from './sessions.service';

@Injectable({
  providedIn: 'root'
})
export class LessonPlaService {

  accessToken: any;
  user!: loggedUser;
  private lessonPlans: LessonPlan[] = [];


  private getHeaders(): HttpHeaders {
    this.accessToken = sessionStorage.getItem('loggedUser');
    this.user = JSON.parse(this.accessToken) as loggedUser;
    if (!this.user) {
      console.log('There is no user');
    }
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.user.token}`,
      'Content-Type': 'application/json',
    });
    return headers;
  }

  
  constructor(private http: HttpClient, public storage: SessionsService) {}



  // getLessonPlans(): LessonPlan[] {
  //   return this.lessonPlans;
  // }

  // addLessonPlan(lessonPlan: LessonPlan): void {
  //   this.lessonPlans.push(lessonPlan);
  // }

  // updateLessonPlan(lessonPlan: LessonPlan): void {
  //   const index = this.lessonPlans.findIndex((plan) => plan.plan_id === lessonPlan.plan_id);
  //   if (index !== -1) {
  //     this.lessonPlans[index] = lessonPlan;
  //   }





    // deleteLessonPlan(plan_id: number): void {
    //   this.lessonPlans = this.lessonPlans.filter((plan) => plan.plan_id !== plan_id);
    // }
  }


  
  

