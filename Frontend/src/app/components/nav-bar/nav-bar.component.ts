import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private location : Location, private titlePage : Title) { }
  ngOnInit(): void {
    }

    // A method that retrieves the title from another service using "getTitle()"
// Returns the title as a string
    showTitle() : string{
      return this.titlePage.getTitle()
    }

// Function to navigate back to the previous page
  navigateBack(): void {
    // Utilize the "location" service to navigate back
    this.location.back()
    // this.router.navigate(['/']); // Navigate back to the previous page
  }

}
