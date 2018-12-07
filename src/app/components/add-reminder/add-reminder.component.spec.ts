// tslint:disable
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AddReminderComponent} from './add-reminder.component';
import {HttpService} from '@service/http/http.service';
import {DataServiceService} from '@service/data-service/data-service.service';
import {NoteService} from '@service/note-service/note-service.service';

describe('AddReminderComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddReminderComponent
      ],
      providers: [
        HttpService,
        DataServiceService,
        NoteService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddReminderComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });
  
    
  it('should run #ngOnInit()', async () => {
    expect(component.ngOnInit()).toBeTruthy();
  });
        
  it('should run #addRemToday()', async () => {
    expect(component.addRemToday()).toBeTruthy();
  });
        
  it('should run #addRemTomorrow()', async () => {
    expect(component.addRemTomorrow()).toBeTruthy();
  });
        
  it('should run #addRemNextWeek()', async () => {
    expect(component.addRemNextWeek()).toBeTruthy();
  });
        
  it('should run #datePickReminder()', async () => {
    expect(component.datePickReminder()).toBeTruthy();
  });
        
  it('should run #backPressDatepicker()', async () => {
    expect(component.backPressDatepicker()).toBeTruthy();
  });
   let date:Date;
   let timing:Date;     
  it('should run #addRemCustom()', async () => {
    expect(component.addRemCustom(date, timing)).toBeTruthy();
  });
        
  it('should run #ngOnDestroy()', async () => {
    expect(component.ngOnDestroy()).toBeTruthy();
  });
  let body = {
    "noteIdList": [this.noteDetails.id],
    "reminder": new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 0, 0, 0)
  }
  it('should add reminder', async(()=>{
    expect(component.body['reminder']).toBe('Sat Nov 17 2018 05:45:00 GMT+0000')
    expect(component.body['reminder']).toBeTruthy();
  }));
  it('should not add reminder', async(()=>{
    expect(component.body['reminder']).toBe('17/11/2018 05:34')
    expect(component.body['reminder']).toBeFalsy();
  }));
        
});
