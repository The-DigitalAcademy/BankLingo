import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LessonPlansComponent } from './pages/lesson-plans/lesson-plans.component';
import { LoginComponent } from './pages/login/login.component';
import { OtpComponent } from './pages/otp/otp.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { RegisterComponent } from './pages/register/register.component';
import { TopicContentComponent } from './pages/topic-content/topic-content.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { LessonPlanCalenderComponent } from './pages/lesson-plan-calender/lesson-plan-calender.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

const routes: Routes = [

  {path: 'edit_profile', component:EditProfileComponent},
  {path: 'forgotpass', component:ForgotpassComponent},
  {path: 'home', component:HomeComponent},
  {path: 'landing', component:LandingComponent},
  {path: 'lesson-plans', component:LessonPlansComponent},
  {path: 'login', component:LoginComponent},
  {path: 'otp', component:OtpComponent},
  {path: 'profile', component:ProfileComponent},
  {path: 'progress', component:ProgressComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'topic_content', component:TopicContentComponent},
  {path: 'topics', component:TopicsComponent},
  {path: 'nav-bar', component:NavBarComponent},
  {path: 'topics', component:TopicsComponent},
  {path: 'lesson_plan_Calender', component:NavBarComponent},
  {path: 'search', component:SearchBarComponent},

  { path: '', redirectTo: 'home', pathMatch: 'full' }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
