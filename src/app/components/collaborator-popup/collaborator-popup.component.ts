import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '@environments/environment';
import { NoteService } from "@service/note-service/note-service.service";
import { UserService } from "@service/user-service/user.service";
import { LoggerService } from '@service/logger/logger.service';
import { CollaboratorComponent, DialogData } from '@components/collaborator/collaborator.component';
import { Note } from '@app/core/model/note';

@Component({
  selector: 'app-collaborator-popup',
  templateUrl: './collaborator-popup.component.html',
  styleUrls: ['./collaborator-popup.component.scss']
})
export class CollaboratorPopupComponent implements OnInit {

  constructor(private userService: UserService,
    private noteService: NoteService,
    public dialogRef: MatDialogRef<CollaboratorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    
  private collaborators=[];
  ngOnInit() {
    LoggerService.log("collab Details: ", this.data['collaborators']);
    for (let i = 0; i < this.data['collaborators'].length; i++) {
      this.collaborators.push(this.data['collaborators'][i])
    }

  }
  

  private firstName = localStorage.getItem('firstName');
  private lastName = localStorage.getItem('lastName');
  private email = localStorage.getItem('email');

  private requestBody = {
    "searchWord": ""
  }
  private userList = [];
  searchUser() {
    this.userService.searchUser(this.requestBody).subscribe(result => {
      this.userList = result['data']['details']
    })
  }
  private owner = this.data['user'];
  private img= environment.apiUrl+this.owner.imageUrl;

  addCollaborator(userDetails) {
    
    let collaboratorBody = {
      "firstName": userDetails.firstName,
      "lastName": userDetails.lastName,
      "email": userDetails.email,
      "userId": userDetails.userId
    }

    this.noteService.addCollaborator(this.data['id'], collaboratorBody).subscribe(result => {
      LoggerService.log("add Collaborator:", result);
      this.collaborators.push(userDetails);
      this.requestBody.searchWord="";
    })
  }
  removeCollaborator(collaboratorId){
    LoggerService.log("c_id: ", collaboratorId);
    this.noteService.removeCollaborator(collaboratorId,this.data['id']).subscribe(result=>{
      for(let i=0; i<this.collaborators.length; i++){
        if(collaboratorId==this.collaborators[i].userId){
          this.collaborators.splice(i,1);
        }
      }
    })

  }
}
