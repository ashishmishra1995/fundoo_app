import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { environment } from '@environments/environment';
import { NoteService } from "@service/note-service/note-service.service";
import { UserService } from "@service/user-service/user.service";
import { LoggerService } from '@service/logger/logger.service';

@Component({
  selector: 'app-collaborator-popup',
  templateUrl: './collaborator-popup.component.html',
  styleUrls: ['./collaborator-popup.component.scss']
})
export class CollaboratorPopupComponent implements OnInit {

  constructor(private userService: UserService,
  private logger: LoggerService) { }

  ngOnInit() {
  }
  private image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;

  private firstName= localStorage.getItem('firstName');
  private lastName= localStorage.getItem('lastName');
  private email= localStorage.getItem('email');

  private requestBody={
    "searchWord":""
  }
  private userList=[];
  searchUser(){
    this.userService.searchUser(this.requestBody).subscribe(result=>{
      this.userList=result['data']['details']
    })
  }
}
