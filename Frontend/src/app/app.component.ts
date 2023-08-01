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
    // Check if the current route is the login page
    // You may need to adjust the route path depending on your actual login page path
    const isLoginPage = this.router.url === '/login';

    // Hide the navigation bar on the login page
    return !isLoginPage;
  }
  title = 'Frontend';
}
