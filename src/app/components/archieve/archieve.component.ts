import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.scss']
})
export class ArchieveComponent implements OnInit {
  records={};
  notes=[];
  @Input() noteDetails;

  constructor(private httpService: HttpService,
  private data: DataServiceService,
  public snackBar: MatSnackBar) { }
  
  ngOnInit() {
    this.getNotes();
    this.gridList();
  }
  toggle=false;
  gridList(){
    this.data.currentMessage.subscribe(message=>{
      this.toggle=message;
    })
  }
  getNotes(){
    var token=localStorage.getItem('token');
    this.records=this.httpService.httpGetNote('notes/getArchiveNotesList',token).subscribe(result=>{
      console.log(result);
      for(var i=0; i<result['data']['data'].length; i++){
        if(result['data']['data'][i].isDeleted==false){
        this.notes.push(result['data']['data'][i])
        }
      }
    // this.notes=result['data']['data'].reverse();
          console.log("archive list: ",this.notes);
      
    },error=>{
      console.log(error);
    });
  }
  
  public body={};
  unarchive(id) {
    
    var token = localStorage.getItem('token');
    this.body={
      "isArchived": false,
      "noteIdList": [id]
    }
    this.records = this.httpService.httpArchiveNote('notes/archiveNotes',this.body, token).subscribe(result => {
      this.snackBar.open('Note unarchived', 'Successfully', {
        duration: 3000,
      });
      this.getNotes();

    }, error => {
      console.log(error);
      console.log(this.noteDetails.id);
      
      this.snackBar.open('Note unarchiving', 'Failed', {
        duration: 3000,
      });
      
    });
  }
}
