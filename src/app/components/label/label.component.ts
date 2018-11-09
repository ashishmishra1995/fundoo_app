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
    this.getLabelList();
  }
  firstName;
  lastName;
  email;
  labels=[];
  getLabelList(){
    var label=[];
    var token = localStorage.getItem('token');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.httpService.httpGetLabel('noteLabels/getNoteLabelList', token).subscribe(result => {
      LoggerService.log("labelList: ",result);
      for (var i = 0; i < result['data']['details'].length; i++) {
        if (result['data']['details'][i].isDeleted == false) {
          label.push(result['data']['details'][i])
        }
      }
      this.labels=label;
    }, error => {
      console.log(error);
    })
  }
  getLabel(labelsList) {

    LoggerService.log("labelId:", labelsList)
    this.httpService.httpAddNote('notes/getNotesListByLabel/' + labelsList, this.token ,{})
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


