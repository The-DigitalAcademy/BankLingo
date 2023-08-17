import { Component, OnInit } from '@angular/core';
import { SessionsService } from './services/sessions.service';
import { Router, ActivatedRoute } from '@angular/router';
import { SwUpdate } from '@angular/service-worker';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading: boolean = true;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private swUpdate: SwUpdate,
    private loaderService: LoaderService
  ) {
   
  }

  showNavBar(): boolean {
    const isLoginPage = this.router.url === '/login';

    const isRegisterPage = this.router.url === '/register';

    const isForgotPassPage = this.router.url === '/forgotpass';

    const isLandingPage = this.router.url === '/landing';

    const isOTPPage = this.router.url === '/otp';

    const isResetPassPage = this.router.url === '/resetpassword';
  

    return !(
      isLoginPage ||
      isRegisterPage ||
      isLandingPage ||
      isForgotPassPage ||
      isOTPPage ||
      isResetPassPage 
    );
  }
  title = 'Frontend';

  ngOnInit() {

    this.loaderService.getLoadingState().subscribe((loading) => {
      this.isLoading = loading; // Update to false when loading is complete
    });
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        if (
          confirm(
            "You're using an old version of the control panel. Want to update?"
          )
        ) {
          window.location.reload();
        }
      });
    }
  }
}
