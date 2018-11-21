import { Component, OnInit, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { HttpService } from '../../core/service/http/http.service';
import { LoggerService } from '../../core/service/logger/logger.service';
import { Note } from '../../core/model/note';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-label',
  templateUrl: './label.component.html',
  styleUrls: ['./label.component.scss']
})
export class LabelComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
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

      }
    )
    this.getLabelList();
  }
  firstName;
  lastName;
  email;
  labels=[];
  getLabelList(){
    var label:Note[]=[];
    var token = localStorage.getItem('token');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.httpService.httpGetLabel('noteLabels/getNoteLabelList', token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      LoggerService.log("labelList: ",result);
      var myData:Note[]=[]
      for (var i = 0; i < myData.length; i++) {
        if (myData[i].isDeleted == false) {
          label.push(myData[i])
        }
      }
      this.labels=label;
    }, error => {
      
    })
  }
  getLabel(labelsList) {

    LoggerService.log("labelId:", labelsList)
    this.httpService.httpAddNote('notes/getNotesListByLabel/' + labelsList, this.token ,{})
    .pipe(takeUntil(this.destroy$))  
    .subscribe(
        (data) => {
          
          this.labelsArray = data['data'].data;
         
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


