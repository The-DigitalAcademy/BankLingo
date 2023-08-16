import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { FullCalendarModule } from '@fullcalendar/angular';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { LoaderInterceptorInterceptor } from './loader-interceptor.interceptor';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

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

import { TitleBarComponent } from './components/title-bar/title-bar.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { PromptComponentComponent } from './components/prompt-component/prompt-component.component';
import { PwaService } from './services/pwa.service';
import { TestingComponent } from './pages/testing/testing.component';
import { SingleComponent } from './pages/single/single.component';

const initializer = (pwaService: PwaService) => () =>
  pwaService.initPwaPrompt();

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
    TitleBarComponent,
    PromptComponentComponent,
    TestingComponent,
    SingleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatToolbarModule,
    MatBottomSheetModule,
    FullCalendarModule,

    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],

  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      deps: [PwaService],
      multi: true,
    },

  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
