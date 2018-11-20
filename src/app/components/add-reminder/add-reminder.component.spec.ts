import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddReminderComponent } from './add-reminder.component';
import { HttpService } from '../../core/service/http/http.service';

describe('AddReminderComponent', () => {
  let component: AddReminderComponent;
  let fixture: ComponentFixture<AddReminderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddReminderComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(AddReminderComponent);
      component=fixture.componentInstance
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddReminderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add reminder', async(()=>{
    expect(component.body['reminder']).toEqual('Sat Nov 17 2018 05:45:00 GMT+0000')
    expect(component.body['reminder']).toBeTruthy();
  }));
  it('should not add reminder', async(()=>{
    expect(component.body['reminder']).toEqual('17/11/2018 05:34')
    expect(component.body['reminder']).toBeFalsy();
  }));
  
});
