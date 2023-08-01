import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


// import { MatProgressBarModule } from '@angular/material/progress-bar'; // Import the progress bar module




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';




import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { TopicsComponent } from './pages/topics/topics.component';
import { ForgotpassComponent } from './pages/forgotpass/forgotpass.component';
import { OtpComponent } from './pages/otp/otp.component';
import { LessonPlansComponent } from './pages/lesson-plans/lesson-plans.component';
import { TopicContentComponent } from './pages/topic-content/topic-content.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { BottomNavBarComponent } from './components/bottom-nav-bar/bottom-nav-bar.component';
import { LandingComponent } from './pages/landing/landing.component';
import { LessonPlanCalenderComponent } from './pages/lesson-plan-calender/lesson-plan-calender.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

import { NgOtpInputModule } from 'ng-otp-input';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { HomeBeforeComponent } from './pages/home-before/home-before.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    TopicsComponent,
    ForgotpassComponent,
    OtpComponent,
    LessonPlansComponent,
    TopicContentComponent,
    ProgressComponent,
    ProfileComponent,
    EditProfileComponent,
    NavBarComponent,
    BottomNavBarComponent,
    LandingComponent,
    LessonPlanCalenderComponent,
    SearchBarComponent,
    

    ResetPasswordComponent,
    HomeBeforeComponent,
    TitleBarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
    BrowserAnimationsModule 
  ],
   
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
