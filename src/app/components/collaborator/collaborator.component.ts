import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NoteCollectionComponent } from '@components/note-collection/note-collection.component';
import { CollaboratorPopupComponent } from '@components/collaborator-popup/collaborator-popup.component';

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

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  addCollaborator(): void {
    const dialogRef = this.dialog.open(CollaboratorPopupComponent, {
      width: '500px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  
}
