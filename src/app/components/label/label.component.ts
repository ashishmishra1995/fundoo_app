import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../core/service/http/http.service';
import { LoggerService } from '../../core/service/logger/logger.service';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit {
@Input() notesArray;
  constructor(private route: ActivatedRoute,
  private httpService: HttpService) { }

  labelsArray = [];
  labelsList;
  token = localStorage.getItem('token');

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.labelsList = params['labelsList'];
        this.getLabel(this.labelsList);
        console.log("labelsList:", this.labelsList);

      }
    )
  }

  getLabel(labelsList) {
    LoggerService.log("labelId:", labelsList)
    this.httpService.httpAddNote('notes/getNotesListByLabel/' + labelsList, {}, this.token)
      .subscribe(
        (data) => {
          console.log("POST Request is successful ", data);
          this.labelsArray = data['data'].data;
          console.log("labelsArray: ",this.labelsArray);
        },
        error => {
          console.log("Error", error);
          console.log("labelsArray: ",this.labelsArray);

        })
  }
}


