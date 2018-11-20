import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '../../core/service/http/http.service';
import { MatSnackBar } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddLabelComponent } from '../add-label/add-label.component';
import { DataServiceService } from '../../core/service/data-service/data-service.service';
import { Router } from '@angular/router';
import { environment } from "../../../environments/environment";
import { LoggerService } from '../../core/service/logger/logger.service';
import { CropImageComponent } from "../crop-image/crop-image.component";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {
  records = {};
  @Input() noteDetails;
  @Input() notesArray;
  @Input() listEmit;
  @Output() eventDone = new EventEmitter();
  public filterargs = {};
  public show = false;
  public labels = [];
  public message: string;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
  public body = {
    "data": ""
  }
  constructor(private breakpointObserver: BreakpointObserver,
    public httpService: HttpService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    private data: DataServiceService,
    public router: Router) { }

  logout() {
    var token = localStorage.getItem('token');
    this.records = this.httpService.httpLogout('user/logout', token).subscribe(result => {
      this.snackBar.open('Logout', 'Successful', {
        duration: 3000,
      });
      localStorage.removeItem('token');
      window.location.href = "login";
    }, error => {
      this.snackBar.open('Logout', 'Failed', {
        duration: 3000,
      });
    });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(AddLabelComponent, {
      width: '500px',
      height: '300px',

    });

    dialogRef.afterClosed().subscribe(result => {
      this.getLabelList();
    });
  }
  firstName;
  lastName;
  email;
  public pic;
  public toggle=false;
  
  ngOnInit() {
    this.getLabelList();
    this.data.currentMsg.subscribe(message => this.message = message)
    this.logoName='fundoo'
  }
 public logoName;

 changeLogo(logoName){
   this.logoName=logoName;
 }

  getLabelList() {
    var label = [];
    var token = localStorage.getItem('token');
    this.firstName = localStorage.getItem('firstName');
    this.lastName = localStorage.getItem('lastName');
    this.email = localStorage.getItem('email');
    this.httpService.httpGetLabel('noteLabels/getNoteLabelList', token).subscribe(result => {
      LoggerService.log("labelList: ", result);
      for (var i = 0; i < result['data']['details'].length; i++) {
        if (result['data']['details'][i].isDeleted == false) {
          label.push(result['data']['details'][i])
        }
      }
      this.labels = label;
    }, error => {
     
    })
  }
  newMessage() {
    this.data.searchData(this.body.data)
  }
  search() {
    this.data.searchData(this.body.data)
  }
  onKeyUp(event) {
    this.body.data = event.target.value;
    this.data.searchData(this.body.data);

  }
  grid = 0;
  viewList() {
    this.grid = 1;
    this.data.changeMessage(true);
  }
  viewGrid() {
    this.grid = 0;
    this.data.changeMessage(false);

  }

  selectedFile = null;
  public image2 = localStorage.getItem('imageUrl');
  img = environment.apiUrl + this.image2;

  onFileUpload(event) {
    this.profileCropOpen(event);

    this.selectedFile = event.path[0].files[0];
    const uploadData = new FormData();
    uploadData.append('file', this.selectedFile, this.selectedFile.name);

  }
  image = {};

  clickLabel(labelsList) {
    var labelsList = labelsList.label;
    this.router.navigate(['/home/label/' + labelsList])
  }
  profileCropOpen(data): void { //Function for the dialog box
    const dialogRefPic = this.dialog.open(CropImageComponent, {
      width: '450px',
      data: data
    });

    dialogRefPic.afterClosed().subscribe(result => {
      this.data.currentProfile.subscribe(message => this.pic = message)
      if (this.pic == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.apiUrl + this.image2;
      }

    });
  }
}
