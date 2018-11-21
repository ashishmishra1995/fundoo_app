import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorUtil } from '../../core/utils/validator.util';
import { HttpService } from '../../core/service/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material";
import { UserService } from "../../core/service/user-service/user.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  signupForm: FormGroup;
  users=[];
  cards = [];
  service: any;
  reg: any;
  hide = true;
  records = {};
  body = {
    "firstName": '',
    "lastName": '',
    "email": "",
    "emailVerified": true,
    "phoneNumber": "",
    "service": this.service,
    "createdDate": new Date(),
    "modifiedDate": new Date(),
    "password": ""
  };


  constructor(private router: Router,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private userService: UserService) { }
     

  ngOnInit() {

    this.signupForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'email': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),
      'phoneNumber': new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      'password': new FormControl('', [Validators.required, Validators.minLength(6)]),
      'confirmPassword': new FormControl('', [Validators.required, ValidatorUtil.matchWithValidator('password')])
    })
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);


    this.records = this.httpService.httpGet('user/service')
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      var data = result['data'];

      for (var i = 0; i < data.data.length; i++) {
        data.data[i].select = false;
        this.cards.push(data.data[i]);
      }
    });

    this.records = this.httpService.httpGet('user')
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
 
    });
  }
  respond(card) {
    this.service = card.name;
  
    card.select = !card.select;
    for (var i = 0; i < this.cards.length; i++) {
      if (card.name == this.cards[i].name) {
        continue;
      }
      this.cards[i].select = false;
    }
  }

  submit() {
    if(this.service===''){
      this.snackBar.open('Please Choose a service', '', {
        duration: 3000,
      });
    }else{
    this.reg = {
      "firstName": this.body.firstName,
      "lastName": this.body.lastName,
      "email": this.body.email,
      "emailVerified": true,
      "phoneNumber": this.body.phoneNumber,
      "service": this.service,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "password": this.body.password
    };
    
    this.records = this.userService.signupPost(this.reg)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result => {
      this.snackBar.open('SignUp', 'Success', {
        duration: 3000,
      });
      this.router.navigate(['login']);
      
    }, error=> {
      this.snackBar.open('SignUp', 'Failed', {
        duration: 3000,
      });
  
    });
    
    this.spinner.show();
    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);

  }
}
ngOnDestroy() {
  this.destroy$.next(true);
  // Now let's also unsubscribe from the subject itself:
  this.destroy$.unsubscribe();
}

}
