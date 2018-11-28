import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArchiveComponent } from './add-archive.component';
import { HttpService } from '../../core/service/http/http.service';

describe('AddArchiveComponent', () => {
  let component: AddArchiveComponent;
  let fixture: ComponentFixture<AddArchiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArchiveComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(AddArchiveComponent);
      component=fixture.componentInstance
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArchiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  afterEach(() => {
    fixture.destroy();
});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be archived', async(()=>{
    expect(component.body.isArchived).toEqual(true)
    expect(component.body.noteIdList).toContain([])
  }));
  
});
