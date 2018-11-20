import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgotPasswordComponent } from './forgot-password.component';
import { HttpService } from '../../core/service/http/http.service';

describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent;
  let fixture: ComponentFixture<ForgotPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgotPasswordComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(ForgotPasswordComponent);
      component=fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should send email', async(()=>{
    expect(component.body.email).toEqual('ashishkumishra1995@gmail.com');
    expect(component.body.email).toBeTruthy();
  }));
  it('should not send email', async(()=>{
    expect(component.body.email).toEqual('');
    expect(component.body.email).toBeFalsy();
  }));
});
