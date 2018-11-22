import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { MatDatepickerModule } from "@angular/material";
import { FormControl } from '@angular/forms';
import { DataServiceService } from "@service/data-service/data-service.service";
import { NoteService } from "@service/note-service/note-service.service";
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-add-reminder',
  templateUrl: './add-reminder.component.html',
  styleUrls: ['./add-reminder.component.scss']
})
export class AddReminderComponent implements OnInit,OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() noteDetails;
  @Output() todayEvent = new EventEmitter();
  @Output() newEvent=new EventEmitter();

  constructor(private httpService: HttpService,
  private dataService: DataServiceService,
  private noteService: NoteService) { }
  public message;
  ngOnInit() {

  }
  public minDate= new Date();
  body = {};
  public currentDate = new Date();
  reminders: any[] = [
    { value: 'morning', viewPeriod: 'Morning', viewTime: '08:00 AM' },
    { value: 'afternoon', viewPeriod: 'Afternoon', viewTime: '01:00 PM' },
    { value: 'evening', viewPeriod: 'Evening', viewTime: '06:00 PM' },
    { value: 'night', viewPeriod: 'Night', viewTime: '09:00 PM' }];

  addRemToday() {
    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), this.currentDate.getDate(), 20, 0, 0, 0)
    }
    this.newEvent.emit(this.body['reminder']);
    this.noteService.addReminder(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      
      this.dataService.changeEvent(true);
      this.todayEvent.emit();
    })
  }

  addRemTomorrow() {

    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 1), 8, 0, 0, 0)
    }
    this.newEvent.emit(this.body['reminder']);
    this.noteService.addReminder(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      
      this.todayEvent.emit();
    })
  }

  addRemNextWeek() {

    this.body = {
      "noteIdList": [this.noteDetails.id],
      "reminder": new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), (this.currentDate.getDate() + 7), 8, 0, 0, 0)
    }
    this.newEvent.emit(this.body['reminder']);
    this.noteService.addReminder(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe((result) => {
      
      this.todayEvent.emit();
    })
  }

  show = true
  datePickReminder() {
    this.show = !this.show;
  }
  backPressDatepicker() {
    this.show = true;
  }
  reminderBody = {
    "date": new FormControl(new Date()),
    "time": ""
  }

  addRemCustom(date, timing) {
  
    timing.match('^[0-2][0-3]:[0-5][0-9]$');

    if (timing == '8:00 AM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
      }
      this.newEvent.emit(this.body['reminder']);
      this.noteService.addReminder(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
 
        this.todayEvent.emit();
      })
    } else if (timing == '1:00 PM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 13, 0, 0, 0)
      }
      this.newEvent.emit(this.body['reminder']);
      this.noteService.addReminder(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.todayEvent.emit();
      })
    } else if (timing == '6:00 PM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 18, 0, 0, 0)
      }
      this.newEvent.emit(this.body['reminder']);
      this.noteService.addReminder(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.todayEvent.emit();
      })
    } else if (timing == '9:00 PM') {
      this.body = {
        "noteIdList": [this.noteDetails.id],
        "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 21, 0, 0, 0)
      }
      this.newEvent.emit(this.body['reminder']);
      this.noteService.addReminder(this.body)
      .pipe(takeUntil(this.destroy$))
      .subscribe((result) => {
        this.todayEvent.emit();
      })
    } else if (timing == this.reminderBody.time) {
      var x;
      var splitTime = this.reminderBody.time.split("", 8);
      var hour = Number(splitTime[0] + splitTime[1]);
      var minute = Number(splitTime[3] + splitTime[4]);
      var ampm = (splitTime[6] + splitTime[7]);
     
      if (ampm == 'AM' || ampm == 'am') {
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minute, 0, 0)
        }
        this.newEvent.emit(this.body['reminder']);
        this.noteService.addReminder(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.todayEvent.emit();
        })
      } else if (ampm == 'PM' || ampm == 'pm') {
        this.body = {
          "noteIdList": [this.noteDetails.id],
          "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour + 12, minute, 0, 0)
        }
        this.newEvent.emit(this.body['reminder']);
        this.noteService.addReminder(this.body)
        .pipe(takeUntil(this.destroy$))
        .subscribe((result) => {
          this.todayEvent.emit();
        })
      }

    }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
