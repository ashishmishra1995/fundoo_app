import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLabelComponent } from './add-label.component';
import { HttpService } from '../../core/service/http/http.service';

describe('AddLabelComponent', () => {
  let component: AddLabelComponent;
  let fixture: ComponentFixture<AddLabelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddLabelComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(AddLabelComponent);
      component=fixture.componentInstance
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should add label', async(()=>{
    expect(component.note['label']).toContain('akm 123');
  }));
  
});
