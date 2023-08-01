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

    showTitle() : string{
      return this.titlePage.getTitle()
    }


  navigateBack(): void {
    this.location.back()
    // this.router.navigate(['/']); // Navigate back to the previous page
  }

}
