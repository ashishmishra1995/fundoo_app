import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';


@Component({
  selector: 'app-change-color',
  templateUrl: './change-color.component.html',
  styleUrls: ['./change-color.component.scss']
})
export class ChangeColorComponent implements OnInit {

  constructor(private httpService: HttpService) { }
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
    ]
  ]

  setColor(id) {
    this.eventColor.emit(id);
    var token = localStorage.getItem('token');
    this.body = {
      "color": id,
      "noteIdList": [this.noteDetails.id]
    }
    this.httpService.httpColorNote('notes/changesColorNotes', this.body, token).subscribe(result => {

      console.log(this.noteDetails.id);
      this.eventColor.emit({

      })

    }, error => {
      console.log(error);


    });
  }
}
