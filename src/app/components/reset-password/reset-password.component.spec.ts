import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordComponent } from './reset-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpService } from '../../core/service/http/http.service';
import { DebugElement } from '@angular/core';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;
  let de = DebugElement;
  let el = HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResetPasswordComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule],
      providers: [{ provide: HttpService, useClass: HttpService }]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(ResetPasswordComponent);
      component = fixture.componentInstance;
      this.de= fixture.debugElement.query(By.css('form'));
      this.el=this.de.nativeElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid', async(() => {
    component.resetForm.controls['newPassword'].setValue('');
    component.resetForm.controls['newPassword'].setValue('145gg');
    component.resetForm.controls['newPassword'].setValue('HJHJFHJHJGHJGHJGHGHJGJGGKGKGKGKG');
    expect(component.resetForm.valid).toBeFalsy();

  }))
  it('form should be valid', async(() => {
    component.resetForm.controls['newPassword'].setValue('gggggggggg');
    expect(component.resetForm.valid).toBeTruthy();

  }))
  it('should set new password', async(()=>{
    expect(component.body.newPassword).toEqual('243gggg');
    expect(component.body.newPassword).toBeTruthy();
  }))
  it('should not set new password', async(()=>{
    expect(component.body.newPassword).toEqual('243g');
    expect(component.body.newPassword).toEqual('243gjkgsdajkgjksadgjkdgsajkgadkjasgd');
    expect(component.body.newPassword).toEqual('');
    expect(component.body.newPassword).toBeFalsy();
  }))

});
