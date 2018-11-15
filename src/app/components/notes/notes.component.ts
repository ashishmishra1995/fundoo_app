import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../core/service/http/http.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  records={};
  public notes=[];
  public pinnedNotes=[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getNotes();
    // this.getPinnedNotes();
  }
  addNewEntry(event){
    if(event){
      this.getNotes();
      // this.getPinnedNotes();
    }
  }
  getNotes(){
    
    var token=localStorage.getItem('token');
    this.records=this.httpService.httpGetNote('notes/getNotesList',token).subscribe(result=>{
      console.log(result);
      this.notes =[];
      for(var i=result['data']['data'].length-1; i>=0; i--){
        if(result['data']['data'][i].isDeleted==false && result['data']['data'][i].isArchived==false && result['data']['data'][i].isPined==false){
        this.notes.push(result['data']['data'][i])
        }
      }
   
          console.log(this.notes);
      
    },error=>{
      console.log(error);
    });
  }

  // getPinnedNotes(){
    
  //   var token=localStorage.getItem('token');
  //   this.records=this.httpService.httpGetNote('notes/getNotesList',token).subscribe(result=>{
  //     console.log(result);
  //     this.pinnedNotes =[];
  //     for(var i=result['data']['data'].length-1; i>=0; i--){
  //       if(result['data']['data'][i].isDeleted==false && result['data']['data'][i].isPined==true){
  //       this.pinnedNotes.push(result['data']['data'][i])
  //       }
  //     }
   
  //         console.log(this.pinnedNotes);
      
  //   },error=>{
  //     console.log(error);
  //   });
  // }
  
}
