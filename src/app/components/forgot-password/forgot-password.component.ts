import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { HttpService } from '../../service/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  recoveryForm: FormGroup;
  constructor(private router: Router,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { }
  
  body = {
      "email": ""
  };
  records={};
  ngOnInit() {
    this.recoveryForm = new FormGroup({

      'email': new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]),

    });
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
  }
  recovery(){
    this.records=this.httpService.httpPost('user/reset', this.body).subscribe(result=>{
      console.log(result);
      this.snackBar.open('Email Sent', 'Success', {
        duration: 3000,
      });
      
      
    },error=>{
      this.snackBar.open('Email Sent', 'Failed', {
        duration: 3000,
      });
    });
  }
}



