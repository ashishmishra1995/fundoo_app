import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpService } from '@service/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { LoggerService } from '@service/logger/logger.service';
import { MessagingService } from '@service/messaging-service/messaging.service';
import { NoteService } from "@service/note-service/note-service.service";
import { UserService } from "@service/user-service/user.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})

export class LoginComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();

  loginFormEmail: FormGroup;
  loginFormPassword: FormGroup;

  hide = true;
  show = true;
  records = {};
  data: any;
  users = [];
  body = {
    "email": "",
    "password": ""
  };
  constructor(private router: Router,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private msgService: MessagingService,
    private noteService: NoteService,
    private userService:UserService) { }

  ngOnInit() {

    this.loginFormEmail = new FormGroup({

      'email': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),

    });
    this.loginFormPassword = new FormGroup({

      'password': new FormControl('', [Validators.required, Validators.minLength(6)])
    });

    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
  }
  public message;
  login() {
    // if (!show) {
      this.records = this.userService.loginPost(this.body)
      .pipe(takeUntil(this.destroy$))  
      .subscribe(result => {
          LoggerService.log('Login data: ', result);

          this.snackBar.open('Login', 'Success', {
            duration: 3000,
          });

          var token = result["id"];
          var userId = result['userId'];
          var firstName = result['firstName'];
          var lastName = result['lastName'];
          var email = result['email'];
          var imageUrl = result['imageUrl'];

          localStorage.setItem("userId", userId);
          localStorage.setItem("token", token);
          localStorage.setItem("firstName", firstName);
          localStorage.setItem("lastName", lastName);
          localStorage.setItem("email", email);
          localStorage.setItem('imageUrl', imageUrl);
          var pushNotification={
            "pushToken":localStorage.getItem('pushToken')
          }
          this.userService.registerToken(pushNotification).subscribe(result=>{
            LoggerService.log("Push Token successfully registered: ", result);
          })
          this.router.navigate(['home']);

          //this.msgService.getPermission();
         
        }, error => {

          this.snackBar.open('Invalid Email/Password', 'Login Failed', {
            duration: 3000,
          });
        })


    // }
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }

}
