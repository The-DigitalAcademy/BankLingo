import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bottom-nav-bar',
  templateUrl: './bottom-nav-bar.component.html',
  styleUrls: ['./bottom-nav-bar.component.scss']
})
export class BottomNavBarComponent implements OnInit{
  
  islog = false
  active ="#homeNav"
  home : string | undefined
  @Input() activeP?: string;

  constructor(){

  }
  ngOnInit(): void {
    const active = document.querySelector('#homeNav');

    switch (this.activeP) {
      case "home":
        console.log('Case 1 matched.');
        break;
      case "lesson":
        console.log('Case 2 matched.');
        break;
        case "progress":
          console.log('Case 2 matched.');
          break;
          case "profile":
            console.log('Case 2 matched.');
            break;
      default:
        console.log('No case matched.');
    }


  }

  

}
