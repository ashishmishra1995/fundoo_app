import { Component, OnInit, Inject, Input } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationComponent } from "../navigation/navigation.component";
import { HttpService } from '../../core/service/http/http.service';
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { NoteService } from "../../core/service/note-service/note-service.service";

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
  public note = {};
  public labels = [];
  @Input() labelDetails;
  constructor(public dialogRef: MatDialogRef<NavigationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private httpService: HttpService,
    private dataService: DataServiceService,
    private noteService: NoteService) { }

  ngOnInit() {

    this.getLabelList();
  }

  onNoClick(): void {
    var token = localStorage.getItem('token');
    if (!this.labels.some((data) => data.label == document.getElementById('label').innerHTML)) {
      this.note = {
        "userId": localStorage.getItem('userId'),
        "label": document.getElementById('label').innerHTML,
        "isDeleted": false
      }
      this.noteService.addLabel(this.note).subscribe(result => {
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
      
    })
}
  deleteLabel(id) {
    this.noteService.deleteLabel(id).subscribe(result => {
      console.log(result);
      this.dataService.changeEvent(true);
      this.getLabelList();

    }, error => {
     
    });
  }

  updateLabel(id) {
    this.note = {
      "userId": localStorage.getItem('userId'),
      "label": document.getElementById('labelUpdate').innerHTML,
      "id": id,
      "isDeleted": false
    }

    this.noteService.editLabel(id , this.note).subscribe(result => {
    

    }, error => {
      
    })
  }
}
