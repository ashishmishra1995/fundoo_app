import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeColorComponent } from './change-color.component';
import { HttpService } from '../../core/service/http/http.service';

describe('ChangeColorComponent', () => {
  let component: ChangeColorComponent;
  let fixture: ComponentFixture<ChangeColorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeColorComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(ChangeColorComponent);
      component=fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeColorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should change color', async(()=>{
    expect(component.body['color']).toEqual('#556B2F')
    expect(component.body['color']).toBeTruthy();
  }));
  it('should not change color', async(()=>{
    expect(component.body['color']).toEqual('');
    expect(component.body['color']).toEqual('556B2F');
    expect(component.body['color']).toBeFalsy();
  }));
});
