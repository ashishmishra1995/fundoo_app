import { Component, OnInit, Input, Output,EventEmitter } from '@angular/core';
import { HttpService } from '../../service/http/http.service';
import { MatSnackBar } from "@angular/material";


@Component({
  selector: 'app-add-archive',
  templateUrl: './add-archive.component.html',
  styleUrls: ['./add-archive.component.css']
})
export class AddArchiveComponent implements OnInit {
  body={
    "isArchived":true,
    "noteIdList":[]
  }
  records={};
  constructor(private httpService: HttpService,
    public snackBar: MatSnackBar) { }
  @Input() noteDetails;
  @Output() eventArchive= new EventEmitter();

  ngOnInit() {
  }

  archive(id) {
    
    var token = localStorage.getItem('token');
    this.body={
      "isArchived": true,
      "noteIdList": [this.noteDetails.id]
    }
    this.records = this.httpService.httpArchiveNote('notes/archiveNotes',this.body, token).subscribe(result => {
      this.snackBar.open('Note archived', 'Successfully', {
        duration: 3000,
      });
      this.eventArchive.emit({
        
      })

    }, error => {
      console.log(error);
      console.log(this.noteDetails.id);
      
      this.snackBar.open('Note archiving', 'Failed', {
        duration: 3000,
      });
      
    });
  }
}
