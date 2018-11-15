import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { DebugElement } from '@angular/core';
import { BrowserModule, By } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let de = DebugElement;
  let el = HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [FormsModule,
        ReactiveFormsModule,
        BrowserModule]
    })
    .compileComponents().then(()=>{
      fixture = TestBed.createComponent(SignupComponent);
      component = fixture.componentInstance;
      this.de= fixture.debugElement.query(By.css('form'));
      this.el=this.de.nativeElement;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('form should be invalid', async(()=>{
    component.signupForm.controls['email'].setValue('');
    component.signupForm.controls['email'].setValue('@bb.AA.com');
    component.signupForm.controls['email'].setValue('AA.23@bbb.com');

    component.signupForm.controls['password'].setValue('');
    component.signupForm.controls['password'].setValue('ak');
    component.signupForm.controls['password'].setValue('aaaaaaaaaaaaaaaaaaa');

    component.signupForm.controls['firstName'].setValue('');
    component.signupForm.controls['firstName'].setValue('ku');

    component.signupForm.controls['lastName'].setValue('');
    component.signupForm.controls['lastName'].setValue('hj');

    component.signupForm.controls['phoneNumber'].setValue('');
    component.signupForm.controls['phoneNumber'].setValue('@678');
    component.signupForm.controls['phoneNumber'].setValue('67@#8999999');
    component.signupForm.controls['phoneNumber'].setValue('111111');
    component.signupForm.controls['phoneNumber'].setValue('78987678@#');
    
    component.signupForm.controls['service'].setValue('');
    expect(component.signupForm.valid).toBeFalsy();
    
}))
it('form should be valid', async(()=>{
  component.signupForm.controls['firstName'].setValue('Ashish');
  component.signupForm.controls['firstName'].setValue('vjgvhjvhjvhjvhjvhjvhjvjhvjhvjhvjh');
  component.signupForm.controls['lastName'].setValue('kumar');
  component.signupForm.controls['lastName'].setValue('fyuyfyufuyfuyfuyfyufjfuyfuyfuyduyfuyfu');
  component.signupForm.controls['email'].setValue('aass@bbbb.com');
  component.signupForm.controls['password'].setValue('akm123');
  component.signupForm.controls['phoneNumber'].setValue('11111111111');
  expect(component.signupForm.valid).toBeTruthy();
}))
});
