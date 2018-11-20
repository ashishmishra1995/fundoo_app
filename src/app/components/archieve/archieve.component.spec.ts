import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchieveComponent } from './archieve.component';
import { HttpService } from '../../core/service/http/http.service';

describe('ArchieveComponent', () => {
  let component: ArchieveComponent;
  let fixture: ComponentFixture<ArchieveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchieveComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(ArchieveComponent);
      component=fixture.componentInstance
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchieveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should unarchive', async(()=>{
    expect(component.body['isArchived']).toEqual(false)
    expect(component.body['isArchived']).toBeTruthy();
  }));
  it('should not unarchive', async(()=>{
    expect(component.body['isArchived']).toEqual(true)
    expect(component.body['isArchived']).toBeFalsy();
  }));
  
});
