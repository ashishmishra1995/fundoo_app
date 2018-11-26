import { Component, Input, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpService } from '@service/http/http.service';
import { MatSnackBar } from "@angular/material";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddLabelComponent } from '@components/add-label/add-label.component';
import { DataServiceService } from '@service/data-service/data-service.service';
import { Router } from '@angular/router';
import { environment } from "@environments/environment";
import { LoggerService } from '@service/logger/logger.service';
import { CropImageComponent } from "@components/crop-image/crop-image.component";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
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
    this.records = this.httpService.httpLogout('user/logout', token)
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(result => {
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

    dialogRef.afterClosed()
    .pipe(takeUntil(this.destroy$)) 
    .subscribe(result => {
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
    this.data.currentMsg
    .pipe(takeUntil(this.destroy$))
    .subscribe(message => this.message = message)
    this.logoName='fundoo'

    if (this.router.url == "/home/notes") {
      this.logoName = "fundoo"
      }
      if (this.router.url == "/home/archieve") {
      this.logoName = "archive"
      }
      if (this.router.url == "/home/search") {
      this.logoName = "fundoo"
      }
      if (this.router.url == "/home/reminder") {
      this.logoName = "reminder"
      }
      if (this.router.url == "/home/trash") {
      this.logoName = "trash"
      }
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
    this.httpService.httpGetLabel('noteLabels/getNoteLabelList', token)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
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
    var labelList = labelsList.label;
    this.router.navigate(['/home/label/' + labelList])
  }
  profileCropOpen(data): void { //Function for the dialog box
    const dialogRefPic = this.dialog.open(CropImageComponent, {
      width: '450px',
      data: data
    });

    dialogRefPic.afterClosed()
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.data.currentProfile
      .pipe(takeUntil(this.destroy$))
      .subscribe(message => this.pic = message)
      if (this.pic == true) {
        this.image2 = localStorage.getItem('imageUrl');
        this.img = environment.apiUrl + this.image2;
      }

    });
  }
  
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}
