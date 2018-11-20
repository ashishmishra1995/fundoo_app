import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MoreComponent } from './more.component';
import { HttpService } from '../../core/service/http/http.service';

describe('MoreComponent', () => {
  let component: MoreComponent;
  let fixture: ComponentFixture<MoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoreComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(MoreComponent);
      component=fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should delete note', async(()=>{
    expect(component.body.isDeleted).toEqual(true);
    expect(component.body.isDeleted).toBeTruthy();
  }))
  it('should not delete note', async(()=>{
    expect(component.body.isDeleted).toEqual(false);
    expect(component.body.isDeleted).toBeFalsy();
  }))
  it('should not add label', async(()=>{
    expect(component.labelBody['labelId']).toEqual('');
    expect(component.body.isDeleted).toBeFalsy();
  }))

});
