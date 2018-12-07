import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionAndAnswerComponent } from './question-and-answer.component';

describe('QuestionAndAnswerComponent', () => {
  let component: QuestionAndAnswerComponent;
  let fixture: ComponentFixture<QuestionAndAnswerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionAndAnswerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionAndAnswerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should like', () => {
    let likeArray=[{
      like:Boolean,
      userId:"hgfyuhjfgvhyj78688"
    }]
    let ques={
      like: likeArray
    }
    expect(component.like(ques)).toBeTruthy();
  });


  it('should not like', () => {
    let likeArray = [{
      like: String,
      userId: "jyhjyuh546576678768fgf"
    }]
    let ques = {
      like: likeArray
    }
    expect(component.like(ques)).toBeFalsy();
  });

  it('should check like', ()=>{
    let likeArray = [{
      like: String,
      userId: "jyhjyuh546576678768fgf"
    }]
    let ques = {
      like: likeArray
    }
    expect(component.likeCheck(likeArray)).toBeTruthy();
  })
  it('should not check like', () => {
    let likeArray = [{
      like: String,
      userId: "jyhjyuh546576678768fgf"
    }]
    let ques = {
      like: likeArray
    }
    expect(component.like(ques)).toBeFalsy();
  });

  it('should create', () => {
    
let RequestBody={
  "message": "vhgfdgh dhjfhdjdjhn dajhgfjhad fhkjgdhjf",
  "notesId": String
}
    expect(component.addQuestion()).toBeTruthy();
  RequestBody = {
    "message": "",
    "notesId": String
  }
    expect(component.addQuestion()).toBeFalsy();

  });




});
