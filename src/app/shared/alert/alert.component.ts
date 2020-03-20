import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  // Message to be displayed is passed as a property
  @Input() message: string;

  constructor() { }

  ngOnInit() {
  }

}
