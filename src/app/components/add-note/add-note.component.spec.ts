import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNoteComponent } from './add-note.component';
import { HttpService } from '../../core/service/http/http.service';

describe('AddNoteComponent', () => {
  let component: AddNoteComponent;
  let fixture: ComponentFixture<AddNoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddNoteComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(AddNoteComponent);
      component=fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add note', async(()=>{
    expect(component.body.title).toEqual('abcd');
    expect(component.body.title).toBeTruthy();
  }));
  
  it('should not add note', async(()=>{
    expect(component.body.title).toEqual('');
    expect(component.body.title).toBeFalsy();
  }));
});
