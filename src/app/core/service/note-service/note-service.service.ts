import { Injectable } from '@angular/core';
import {  HttpHeaders } from '@angular/common/http';
import { HttpService } from '../http/http.service';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class NoteServiceService {

  public url;
  public access_token = localStorage.getItem('token');
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': this.access_token
    })
  };
  public httpO = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.access_token
    })
  };
  public httpImage = {
    headers: new HttpHeaders({
     
      'Authorization': this.access_token
    })
  };

  constructor(private service: HttpService) { }
  NewNote(RequestBody){
    this.url = environment.baseUrl+"/notes/addNotes";
    console.log(RequestBody);
    
   return this.service.NewPost(this.url, RequestBody, this.httpOptions)
  }
  UpdateNote(RequestBody){
    this.url = environment.baseUrl + "/notes/updateNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpOptions)

  }
  UpdateChecklist(RequestBody,noteId,ChecklistId){
    this.url = environment.baseUrl+ "/notes/" + noteId + "/checklist/" + ChecklistId + "/update";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  removeChecklist(RequestBody,noteId,checklistId){
    this.url = environment.baseUrl + "/notes/" + noteId + "/checklist/" + checklistId + "/remove";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  addChecklist(RequestBody,noteId){
    this.url = environment.baseUrl + "/notes/"+noteId+"/checklist/add";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  archive(RequestBody){
    this.url = environment.baseUrl +"/notes/archiveNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  trash(RequestBody){
    this.url = environment.baseUrl+"/notes/trashNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  changeColor(RequestBody){
    this.url = environment.baseUrl +"/notes/changesColorNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  addImage(RequestBody){
    this.url = environment.baseUrl +"/user/uploadProfileImage";
    return this.service.NewPost(this.url, RequestBody, this.httpImage)

  }
  addLabel(RequestBody){
    this.url = environment.baseUrl+"/noteLabels"
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  getNoteLabellist(){
    this.url = environment.baseUrl+ "/noteLabels/getNoteLabelList"
    return this.service.NewGet(this.url, this.httpOptions)
  }
  deleteLabel(labelId){
    this.url = environment.baseUrl + "/noteLabels/" + labelId +"/deleteNoteLabel";
    return this.service.delete(this.url,this.httpO);
  }
  editLabel(labelId, RequestBody){
    this.url = environment.baseUrl+ "/noteLabels/"+labelId+"/updateNoteLabel";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  getLabelNotes(labelName){
    this.url = environment.baseUrl +"/notes/getNotesListByLabel/"+labelName;
    return this.service.NewPost(this.url,null,this.httpO)
  }
  getArchiveNotes(){
    this.url = environment.baseUrl +"/notes/getArchiveNotesList";
  return  this.service.NewGet(this.url,this.httpOptions)
  }
  getTrashNotes(){
    this.url = environment.baseUrl+"/notes/getTrashNotesList";
    return this.service.NewGet(this.url, this.httpOptions)
  }
  addLabeltoNotes(RequestBody,noteId,labelId){
    this.url = environment.baseUrl+ "/notes/" + noteId + "/addLabelToNotes/" + labelId + "/add"
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  removeLabelFromNotes(RequestBody,noteId,labelId){
    this.url = environment.baseUrl+ "/notes/"+noteId+"/addLabelToNotes/" +labelId+ "/remove";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  pin(RequestBody){
    this.url = environment.baseUrl+"/notes/pinUnpinNotes";
    return this.service.NewPost(this.url, RequestBody, this.httpO)

  }
  getNotes(){
    this.url = environment.baseUrl+"/notes/getNotesList";
    return this.service.NewGet(this.url,this.httpOptions)
  }
}