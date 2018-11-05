import { Component, OnInit, Input } from '@angular/core';
import { HttpService } from '../../service/http/http.service';
@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.css']
})
export class ArchieveComponent implements OnInit {
  records={};
  notes=[];
  constructor(private httpService: HttpService) { }
  
  ngOnInit() {
    this.getNotes();
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
}
