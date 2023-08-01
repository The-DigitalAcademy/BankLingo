import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {

  constructor(private router: Router, private location : Location) { }

  navigateBack(): void {
    this.location.back()
    // this.router.navigate(['/']); // Navigate back to the previous page
  }

}
