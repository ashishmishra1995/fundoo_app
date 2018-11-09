import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ValidatorUtil } from '../../core/utils/validator.util';
import { HttpService } from '../../core/service/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
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
    // "username": "",
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
    public snackBar: MatSnackBar) { }
     

  ngOnInit() {

    this.signupForm = new FormGroup({
      'firstName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'lastName': new FormControl('', [Validators.required, Validators.minLength(3)]),
      // 'username': new FormControl('', [Validators.required, Validators.minLength(6)]),
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


    this.records = this.httpService.httpGet('user/service').subscribe(result => {
      var data = result['data'];
      console.log(data);
      for (var i = 0; i < data.data.length; i++) {
        data.data[i].select = false;
        this.cards.push(data.data[i]);
      }
    });

    this.records = this.httpService.httpGet('user').subscribe(result => {
      console.log("Registered users= ", result);
    });
  }
  respond(card) {
    this.service = card.name;
    console.log(this.service);
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
      // "username": this.body.username,
      "email": this.body.email,
      "emailVerified": true,
      "phoneNumber": this.body.phoneNumber,
      "service": this.service,
      "createdDate": new Date(),
      "modifiedDate": new Date(),
      "password": this.body.password
    };
    
    this.records = this.httpService.httpPost('user/userSignUp', this.reg).subscribe(result => {
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

}
