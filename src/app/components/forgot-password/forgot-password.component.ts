import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, Params } from '@angular/router';
import { HttpService } from '@service/http/http.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from "@angular/material";
import { ActivatedRoute } from '@angular/router';
import { UserService } from "@service/user-service/user.service";
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  recoveryForm: FormGroup;
  constructor(private router: Router,
    private httpService: HttpService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
    private userService: UserService) { }
  
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
    this.records=this.userService.resetPassword(this.body)
    .pipe(takeUntil(this.destroy$))
    .subscribe(result=>{
   
      this.snackBar.open('Email Sent', 'Success', {
        duration: 3000,
      });
      
      
    },error=>{
      this.snackBar.open('Email Sent', 'Failed', {
        duration: 3000,
      });
    });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Now let's also unsubscribe from the subject itself:
    this.destroy$.unsubscribe();
  }
}



