import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule]
    })
      .compileComponents().then(()=>{
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        de= fixture.debugElement.query(By.css('form'));
        el=this.de.nativeElement;
      });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async(()=>{
      component.loginFormEmail.controls['email'].setValue('');
      component.loginFormEmail.controls['email'].setValue('@bb.AA.com');
      component.loginFormPassword.controls['password'].setValue('');
      component.loginFormPassword.controls['password'].setValue('ak');
      component.loginFormPassword.controls['password'].setValue('aaaaaaaaaaaaaaaaaaa');
      component.loginFormEmail.controls['email'].setValue('AA.23@bbb.com');
      component.loginFormPassword.controls['password'].setValue('aaaaaaaaaaaaaaaaaaa858578');

      expect(component.loginFormEmail.valid).toBeFalsy();
      expect(component.loginFormPassword.valid).toBeFalsy();
  }));
  
  it('form should be valid', async(()=>{
    component.loginFormEmail.controls['email'].setValue('aass@bbbb.com');
    component.loginFormPassword.controls['password'].setValue('akm123');
    component.loginFormPassword.controls['password'].setValue('Akm@12345');
    
    expect(component.loginFormEmail.valid).toBeTruthy();
    expect(component.loginFormPassword.valid).toBeTruthy();
  }));

  it('should login', async(()=>{
    component.login()
  }))

  it('should call the login method', async(()=>{
    fixture.detectChanges();
    spyOn(component,'login')
    el=fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.login).toHaveBeenCalledTimes(1);
  }))
});
