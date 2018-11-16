import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from "../../core/service/http/http.service";
import { DataServiceService } from '../../core/service/data-service/data-service.service';

@Component({
  selector: 'app-reminder',
  templateUrl: './reminder.component.html',
  styleUrls: ['./reminder.component.scss']
})
export class ReminderComponent implements OnInit {

  constructor(private httpService: HttpService,
    private data: DataServiceService) { }

  @Input() notesArray;
  ngOnInit() {
    this.getReminder();
    this.gridList();

  }
  toggle = false;
  gridList() {
    this.data.currentMessage.subscribe(message => {
      this.toggle = message;
    })
  }
  public reminder = [];
  public val1;
  public val2;
  getReminder() {

    var token = localStorage.getItem('token');
    this.httpService.httpGetLabel('notes/getReminderNotesList', token).subscribe(result => {
      console.log("result reminder: ", result);
      this.reminder = result['data'].data;
      this.reminder.sort(this.sortFunc)
      console.log("reminders: ", this.reminder);
      
    }, error => {
      console.log(error);
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

  

}
