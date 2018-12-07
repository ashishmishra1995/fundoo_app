import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';


import {Component, Directive} from '@angular/core';
import {AddNoteComponent} from './add-note.component';
import {NoteService} from '@service/note-service/note-service.service';
import {UserService} from '@app/core/service/user-service/user.service';

describe('AddNoteComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddNoteComponent
      ],
      providers: [
        NoteService,
        UserService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddNoteComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', async () => {
    // const result = component.ngOnInit();
  });

  it('should run #changeColor()', async () => {
    // const result = component.changeColor(event);
  });

  it('should run #addNotes()', async () => {
    // const result = component.addNotes();
  });

  it('should run #getFormUrlEncoded()', async () => {
    // const result = component.getFormUrlEncoded(toConvert);
  });

  it('should run #pinEvent()', async () => {
    // const result = component.pinEvent(event);
  });

  it('should run #labelEvent()', async () => {
    // const result = component.labelEvent(event);
  });

  it('should run #onEnter()', async () => {
    // const result = component.onEnter(event);
  });

  it('should run #onDelete()', async () => {
    // const result = component.onDelete(deletedObj);
  });

  it('should run #deleteLabel()', async () => {
    // const result = component.deleteLabel(label);
  });

  it('should run #archiveEvent()', async () => {
    // const result = component.archiveEvent(event);
  });

  it('should run #checklist()', async () => {
    // const result = component.checklist($event);
  });

  it('should run #reminderEvent()', async () => {
    // const result = component.reminderEvent(event);
  });

  it('should run #deleteReminder()', async () => {
    // const result = component.deleteReminder();
  });

  it('should run #collaborator()', async () => {
    // const result = component.collaborator();
  });

  it('should run #searchUser()', async () => {
    // const result = component.searchUser();
  });

  it('should run #addCollaborator()', async () => {
    // const result = component.addCollaborator(userDetails);
  });

  it('should run #removeCollaborator()', async () => {
    // const result = component.removeCollaborator(collaboratorId);
  });

  it('should run #closeCollaborator()', async () => {
    // const result = component.closeCollaborator();
  });

  it('should run #ngOnDestroy()', async () => {
    // const result = component.ngOnDestroy();
  });

});