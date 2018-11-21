import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { HttpService } from "../../core/service/http/http.service";
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private httpService: HttpService,
    private data: DataServiceService) { }

  @Input() notesArray;
  ngOnInit() {
    this.getReminder();
    this.gridList();

  }
  toggle = false;
  gridList() {
    this.data.currentMessage
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => {
      this.toggle = message;
    })
  }
  public reminder = [];
  public val1;
  public val2;
  getReminder() {

    var token = localStorage.getItem('token');
    this.httpService.httpGetLabel('notes/getReminderNotesList', token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
    
      this.reminder = result['data'].data;
      this.reminder.sort(this.sortFunc)
      
      
    }, error => {
     
    })
  }
  sortFunc (a, b) {
    var first=new Date(a.reminder[0])
    var second= new Date(b.reminder[0]);
    if (first < second) //sort string ascending
        return -1 
    if (first > second)
        return 1
    return 0 //default return value (no sorting)
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }  

}
