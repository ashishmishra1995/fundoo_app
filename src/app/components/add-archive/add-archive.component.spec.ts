import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Injectable, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { By } from '@angular/platform-browser';

import {Component, Directive} from '@angular/core';
import {AddArchiveComponent} from './add-archive.component';
import {HttpService} from '@service/http/http.service';
import {MatSnackBar} from '@angular/material';
import {NoteService} from '@service/note-service/note-service.service';

describe('AddArchiveComponent', () => {
  let fixture;
  let component;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AddArchiveComponent
      ],
      providers: [
        HttpService,
        MatSnackBar,
        NoteService,
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
    fixture = TestBed.createComponent(AddArchiveComponent);
    component = fixture.debugElement.componentInstance;
  });

  it('should create a component', async () => {
    expect(component).toBeTruthy();
  });


  it('should run #ngOnInit()', async () => {
    expect(component.ngOnInit()).toBeTruthy();
  });
  let id;
  it('should run #archive()', async () => {
    expect(component.archive(id)).toBeTruthy();
  });

  it('should run #ngOnDestroy()', async () => {
    expect(component.ngOnDestroy()).toBeTruthy();
  });

});