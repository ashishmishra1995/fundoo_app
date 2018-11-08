import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../service/http/http.service';
import { MatDatepickerModule } from "@angular/material";

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.css']
})
export class AddReminderComponent implements OnInit {

  @Input() noteDetails;
  @Output() todayEvent=new EventEmitter();

  constructor(private httpService: HttpService) { }

  ngOnInit() {

  }

  body={};
  
  addRemToday(){
    // this.todayEvent.emit();
    var currentDate=new Date();
    this.body={
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(currentDate.getFullYear(),currentDate.getMonth(),currentDate.getDate(),8,0,0,0)
    }
    this.httpService.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'),this.body).subscribe((result)=>{
      console.log(result);
    })
  }

  addRemTomorrow(){
    // this.todayEvent.emit();
    var currentDate=new Date();
    this.body={
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(currentDate.getFullYear(),currentDate.getMonth(),(currentDate.getDate()+1),8,0,0,0)
    }
    this.httpService.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'),this.body).subscribe((result)=>{
      console.log(result);
    })
  }

  addRemNextWeek(){
    // this.todayEvent.emit();
    var currentDate=new Date();
    this.body={
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(currentDate.getFullYear(),currentDate.getMonth(),(currentDate.getDate()+7),8,0,0,0)
    }
    this.httpService.httpAddReminder('notes/addUpdateReminderNotes', localStorage.getItem('token'),this.body).subscribe((result)=>{
      console.log(result);
    })
  }
  show=true
  datePickReminder(){
    this.show=!this.show;
  }
  backPressDatepicker(){
    this.show=true;
  }
}
