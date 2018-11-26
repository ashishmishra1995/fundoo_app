import { Component, OnInit,Output,Input,EventEmitter, OnDestroy} from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  @Input() notesArray;
  @Output() pinEmit=new EventEmitter();

  constructor(private httpService: HttpService) { }
  
  ngOnInit() {
  }

  token = localStorage.getItem('token');
  pin() {
    this.httpService.httpArchiveNote('/notes/pinUnpinNotes',
      {
        "noteIdList": [this.notesArray.id],
        "isPined": true
      },
      this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
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
        "noteIdList": [this.notesArray.id],
        "isPined": false
      },
      this.token)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.pinEmit.emit({});

        },
        error => {
        })
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}