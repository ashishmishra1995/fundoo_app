import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { NoteCollectionComponent } from '../note-collection/note-collection.component';

export interface DialogData {
  firstName: string,
  lastName: string,
  email: string,
  userId: string
}

@Component({
  selector: 'app-collaborator',
  templateUrl: './collaborator.component.html',
  styleUrls: ['./collaborator.component.scss']
})
export class CollaboratorComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  
  addCollaborator(): void {
    //this.dialogRefCollab.close();
  }

  
}
