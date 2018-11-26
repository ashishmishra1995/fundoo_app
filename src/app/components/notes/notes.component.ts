import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpService } from '@service/http/http.service';
import { Note } from "@model/note";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LoggerService } from '@app/core/service/logger/logger.service';
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  records={};
  private notes : Note[]=[];
  public pinArray=[];

  constructor(private httpService: HttpService) { }

  ngOnInit() {
    this.getNotes();
    LoggerService.log("notes: ",this.notes)
    this.getPinnedNotes();
  }
  addNewEntry(event){
    if(event){
      this.getNotes();
      // this.getPinnedNotes();
    }
  }

  newNote(noteData :Note){
    //if(event){
      this.notes.splice(0,0,noteData);
      // this.getPinnedNotes();
    //}
  }
  getNotes(){
    
    var token=localStorage.getItem('token');
    this.records=this.httpService.httpGetNote('notes/getNotesList',token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{
  
      var mydata:Note[]=result['data']['data']; 
    
      this.notes =[];
      for(var i=mydata.length-1; i>=0; i--){
        if(mydata[i].isDeleted==false && mydata[i].isArchived==false && mydata[i].isPined==false){
        this.notes.push(mydata[i]);
        }
      }
      LoggerService.log("notes: ",this.notes)
    
      
    },error=>{

    });
  }

  getPinnedNotes(){
    
    var token=localStorage.getItem('token');
    this.records=this.httpService.httpGetNote('notes/getNotesList',token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{
     
      var pinnedData: Note[]=result['data']['data']
      this.pinArray =[];
      for(var i=pinnedData.length-1; i>=0; i--){
        if(pinnedData[i].isDeleted==false && pinnedData[i].isPined==true){
        this.pinArray.push(pinnedData[i])
        }
      }
   
     
      
    },error=>{
 
    });
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
