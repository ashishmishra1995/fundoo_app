import { Component, OnInit, Input, Output, EventEmitter,OnDestroy } from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { NoteService } from "@service/note-service/note-service.service";
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private httpService: HttpService,
    private noteService: NoteService) { }
  @Input() noteDetails;
  @Output() eventColor = new EventEmitter();
  body = {
    "color": "",
    "noteIdList": []
  }

  ngOnInit() {
  }
  colorCodes = [
    [
      {
        'colorCode': '#fafafa',
        'tooltip': 'white'
      },
      {
        'colorCode': '#ff8a80',
        'tooltip': 'red'
      },
      {
        'colorCode': '#fbbc04',
        'tooltip': 'orange'
      },
      {
        'colorCode': '#ffff8d',
        'tooltip': 'yellow'
      }
    ],
    [
      {
        'colorCode': '#ccff90',
        'tooltip': 'green'
      },
      {
        'colorCode': '#a7ffeb',
        'tooltip': 'teal'
      },
      {
        'colorCode': '#80d8ff',
        'tooltip': 'blue'
      },
      {
        'colorCode': '#82b1ff',
        'tooltip': 'dark blue'
      }
    ],
    [
      {
        'colorCode': '#b388ff',
        'tooltip': 'purple'
      },
      {
        'colorCode': '#f8bbd0',
        'tooltip': 'pink'
      },
      {
        'colorCode': '#d7ccc8',
        'tooltip': 'brown'
      },
      {
        'colorCode': '#cfd8dc',
        'tooltip': 'grey'
      }
    ],
    [
      {
        'colorCode': '#8b008b',
        'tooltip': 'dark magenta'
      },
      {
        'colorCode': '#2F4F4F',
        'tooltip': 'dark slate gray'
      },
      {
        'colorCode': '#800000',
        'tooltip': 'maroon'
      },
      {
        'colorCode': '#556B2F',
        'tooltip': 'dark olive green'
      }
    ]
  ]

  setColor(id) {
    this.eventColor.emit(id);
    // var token = localStorage.getItem('token');
    this.body = {
      "color": id,
      "noteIdList": [this.noteDetails.id]
    }
    this.noteService.changeColor(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {

      this.eventColor.emit({

      })

    }, error => {



    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
