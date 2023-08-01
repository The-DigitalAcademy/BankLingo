import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.scss']
})
export class ProgressComponent implements OnInit {


  constructor(private titlePage : Title){ }

  ngOnInit(): void {
    this.titlePage.setTitle("Progress")

  }

}
