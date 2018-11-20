import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CropImageComponent } from './crop-image.component';
import { HttpService } from '../../core/service/http/http.service';

describe('CropImageComponent', () => {
  let component: CropImageComponent;
  let fixture: ComponentFixture<CropImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CropImageComponent ],
      providers:[ { provide: HttpService, useClass: HttpService } ]
    })
    .compileComponents().then(()=>{
      fixture=TestBed.createComponent(CropImageComponent);
      component=fixture.componentInstance;
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CropImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  // it('should crop image', async(()=>{
  //   expect(component.croppedImage).toEqual('#556B2F')
  //   expect(component.croppedImage).toBeTruthy();
  // }));
});
