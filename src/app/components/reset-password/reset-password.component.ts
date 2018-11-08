import { Component, OnInit, NgModule } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { HttpService } from '../../core/service/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  constructor(private router: Router,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) { }
    body = {
      "newPassword": ""
    };

  records={};
  token;
  ngOnInit() {
    this.resetForm = new FormGroup({

      'newPassword': new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),

    });
    this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 2 seconds */
      this.spinner.hide();
    }, 2000);
    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['id'];
      console.log(this.token);
    });
  }

  reset(){
      this.records=this.httpService.httpPasswordUpdate('user/reset-password', this.token, this.body ).subscribe(result=>{
      this.snackBar.open('Password Updation', 'Success', {
        duration: 3000,
      });
    },error=>{
      this.snackBar.open('Password Updation', 'Failed', {
        duration: 3000,
      });
    });
    
  }
}
