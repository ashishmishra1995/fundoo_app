import { Component, OnInit } from '@angular/core';
import { MessagingService } from "./core/service/messaging-service/messaging.service";
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title="fundoo-app"
  message;
  messaging;

  constructor(private msgService: MessagingService) {}

  ngOnInit() {
    
    this.msgService.getPermission()
    this.msgService.receiveMessage()
    //this.message = this.msgService.currentMessage
  }

}

