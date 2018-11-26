import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationComponent } from '@components/navigation/navigation.component';
import { HttpService } from '@service/http/http.service';
import { environment } from '@environments/environment';
import { DataServiceService } from '@service/data-service/data-service.service';
import { NoteService } from "@service/note-service/note-service.service";
import { Subject } from 'rxjs';

import { takeUntil } from 'rxjs/operators';


@Component({
selector: 'app-crop-image',
templateUrl: './crop-image.component.html',
styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit, OnDestroy {
    destroy$: Subject<boolean> = new Subject<boolean>();

public croppedImage: any = '';
imageChangedEvent: any = '';
constructor(
public dialogRefPic: MatDialogRef<NavigationComponent>,
@Inject(MAT_DIALOG_DATA) public data: any,
private httpService: HttpService,
private dataService: DataServiceService,
private noteService: NoteService) { }

ngOnInit() {
}
imageCropped(event: any) {
this.croppedImage =event.file;
}
public image2 = localStorage.getItem('imageUrl');
img = environment.apiUrl + this.image2;
onUpload() {
// var token = localStorage.getItem('token');

const uploadData = new FormData();
uploadData.append('file', this.croppedImage);
this.noteService.addImage(uploadData)
.pipe(takeUntil(this.destroy$))
.subscribe(res => {
this.img = environment.apiUrl + res['status'].imageUrl;
localStorage.setItem("imageUrl", res['status'].imageUrl);
this.dialogRefPic.close()
this.dataService.changeProfile(true);
}, error => {


})

}
ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}