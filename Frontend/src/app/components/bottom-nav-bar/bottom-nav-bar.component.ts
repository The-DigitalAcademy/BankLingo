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


  }

}
