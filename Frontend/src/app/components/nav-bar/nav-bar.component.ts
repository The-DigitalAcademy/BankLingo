import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { SessionsService } from 'src/app/services/sessions.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  onProfile=false
  constructor(private router: Router, private location : Location, private titlePage : Title, private session : SessionsService) { }
  ngOnInit(): void {

    }


    showTitle() : string{
      return this.titlePage.getTitle()
    }

    isProfilePage(): boolean{
      const isProfilePage = this.router.url === '/profile';
      return (
        isProfilePage 
      );
    }

    logout() {
      this.session.clean()
      this.router.navigate(['/login']); 
    }

  navigateBack(): void {
    this.location.back()
  }

}
