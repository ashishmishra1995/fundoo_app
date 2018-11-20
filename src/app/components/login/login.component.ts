import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { HttpService } from '../../core/service/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, map, tap } from 'rxjs/operators';
import { MatSnackBar } from "@angular/material";
import { LoggerService } from '../../core/service/logger/logger.service';
import { MessagingService } from '../../core/service/messaging-service/messaging.service';
import { NoteService } from "../../core/service/note-service/note-service.service";
import { UserService } from "../../core/service/user-service/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('EnterLeave', [
      state('flyIn', style({ transform: 'translateX(0)' })),
      transition(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.3s 300ms ease-in')
      ]),
      transition(':leave', [
        animate('0.5s ease-out', style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})

export class LoginComponent implements OnInit {
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
  login(show) {
    if (!show) {
      this.records = this.userService.loginPost(this.body)
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


    }
  }

}
