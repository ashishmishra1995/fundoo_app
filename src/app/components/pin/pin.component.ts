import { Component, OnInit,Output,Input,EventEmitter} from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {

  @Input() pinArray;
  @Output() pinEmit=new EventEmitter();

  constructor(private httpService: HttpService) { }
  
  ngOnInit() {
  }

  token = localStorage.getItem('token');
  pin() {
    this.httpService.httpArchiveNote('/notes/pinUnpinNotes',
      {
        "noteIdList": [this.pinArray.id],
        "isPined": true
      },
      this.token).subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }

  unPin()
  {
    this.httpService.httpArchiveNote('/notes/pinUnpinNotes',
      {
        "noteIdList": [this.pinArray.id],
        "isPined": false
      },
      this.token).subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }

}