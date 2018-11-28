import { Component, OnInit,Inject, Input, Output,EventEmitter } from '@angular/core';
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

  @Input() noteDetails;
  @Output() onCollaborator= new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  
  addCollaborator(): void {
    const dialogRef = this.dialog.open(CollaboratorPopupComponent, {
      width: '500px',
      maxWidth: 'auto',
      data: this.noteDetails 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onCollaborator.emit({})
    });
  }

  
}
