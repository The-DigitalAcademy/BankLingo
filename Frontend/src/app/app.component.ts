import { Component, OnInit } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  showNavBar(): boolean {
    const isLoginPage = this.router.url === '/login';

  const isRegisterPage = this.router.url === '/register';

   const isForgotPassPage = this.router.url === '/forgotpass';

  const isLandingPage = this.router.url === '/landing';

  const isOTPPage = this.router.url === '/otp';

  const isResetPassPage = this.router.url === '/resetpassword';

  return !(isLoginPage || isRegisterPage || isLandingPage || isForgotPassPage || isOTPPage || isResetPassPage) ;
  }
  title = 'Frontend';
}
