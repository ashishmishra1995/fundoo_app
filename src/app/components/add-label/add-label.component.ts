import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationComponent } from "../navigation/navigation.component";
import { HttpService } from '../../core/service/http/http.service';
import { DataServiceService } from '../../core/service/data-service/data-service.service';

export interface DialogData {
  label: string;
  userId: string;
  isDeleted: boolean;
}
@Component({
  selector: 'app-add-label',
  templateUrl: './add-label.component.html',
  styleUrls: ['./add-label.component.scss']
})
export class AddLabelComponent implements OnInit {
  note = {};
  labels = [];
  @Input() labelDetails;
  constructor(public dialogRef: MatDialogRef<NavigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpService: HttpService,
    private dataService: DataServiceService) { }

  ngOnInit() {

    this.getLabelList();
  }

  onNoClick(): void {
    var token = localStorage.getItem('token');
    console.log(document.getElementById('label').innerHTML);
    console.log(this.labels);
    if (!this.labels.some((data) => data.label == document.getElementById('label').innerHTML)) {
      this.note = {
        "userId": localStorage.getItem('userId'),
        "label": document.getElementById('label').innerHTML,
        "isDeleted": false
      }
      this.httpService.httpAddLabel('noteLabels', this.note, token).subscribe(result => {
        this.getLabelList();
      });
      this.dialogRef.close();
    } else {
      alert("Label already exists");
    }
  }
getLabelList(){
  var label = [];
  var token = localStorage.getItem('token');
    this.httpService.httpGetLabel('noteLabels/getNoteLabelList', token).subscribe(result => {
      console.log(result);
      for (var i = 0; i < result['data']['details'].length; i++) {
        if (result['data']['details'][i].isDeleted == false) {
        label.push(result['data']['details'][i])
        }
      }
      this.labels = label;
    }, error => {
      console.log(error);
    })
}
  deleteLabel(id) {
    this.httpService.httpDeleteLabel('noteLabels/' + id + '/deleteNoteLabel', localStorage.getItem('token')).subscribe(result => {
      console.log(result);
      this.dataService.changeEvent(true);
      this.getLabelList();

    }, error => {
      console.log(error);
    });
  }

  updateLabel(id) {
    this.note = {
      "userId": localStorage.getItem('userId'),
      "label": document.getElementById('labelUpdate').innerHTML,
      "id": id,
      "isDeleted": false
    }

    this.httpService.httpUpdateLabel('noteLabels/' + id + '/updateNoteLabel', this.note, localStorage.getItem('token')).subscribe(result => {
      console.log(result);

    }, error => {
      console.log(error);
    })
  }
}
