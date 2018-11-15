import { Component, OnInit,Output,Input,EventEmitter} from '@angular/core';
import { HttpService } from 'src/app/core/service/http/http.service';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit {



  @Input() arrayPin;
  body={}
  @Output() emitter = new EventEmitter();
  constructor(private httpService:HttpService) { }
  token=localStorage.getItem('token')
  ngOnInit() 
  {
    console.log("arrayPin",this.arrayPin);
  }

  pin()
  {
  this.body={
    'noteIdList':[this.arrayPin.id],
    'isPined':true
  }
  this.httpService.httpArchiveNote('notes/pinUnpinNotes',this.body,this.token)
  .subscribe(data=>{
    console.log(data)
      this.emitter.emit({
      })
  })
  error=>
  {
    console.log(error)
  }
}

Unpin()
{
this.body={
  'noteIdList':[this.arrayPin.id],
  'isPined':false
}
this.httpService.httpArchiveNote('notes/pinUnpinNotes',this.body,this.token)
.subscribe(data=>{
  console.log(data)
    this.emitter.emit({
    })
})
error=>
{
  console.log(error)
}
}
}