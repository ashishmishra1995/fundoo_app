import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NavigationComponent } from '../navigation/navigation.component';
import { HttpService } from '../../core/service/http/http.service';
import { environment } from '../../../environments/environment';
import { DataServiceService } from '../../core/service/data-service/data-service.service';

@Component({
selector: 'app-crop-image',
templateUrl: './crop-image.component.html',
styleUrls: ['./crop-image.component.scss']
})
export class CropImageComponent implements OnInit {
public croppedImage: any = '';
imageChangedEvent: any = '';
constructor(
public dialogRefPic: MatDialogRef<NavigationComponent>,
@Inject(MAT_DIALOG_DATA) public data: any,
private httpService: HttpService,
private dataService: DataServiceService) { }

ngOnInit() {
}
imageCropped(event: any) {
this.croppedImage =event.file;
}
public image2 = localStorage.getItem('imageUrl');
img = environment.apiUrl + this.image2;
onUpload() {
var token = localStorage.getItem('token');
console.log(this.croppedImage);
const uploadData = new FormData();
uploadData.append('file', this.croppedImage);
this.httpService.httpAddImage('user/uploadProfileImage', uploadData, token).subscribe(res => {
this.img = environment.apiUrl + res['status'].imageUrl;
localStorage.setItem("imageUrl", res['status'].imageUrl);
this.dialogRefPic.close()
this.dataService.changeMessage(true);
}, error => {


})

}

}