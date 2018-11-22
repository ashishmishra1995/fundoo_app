import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CollaboratorPopupComponent } from './collaborator-popup.component';

describe('CollaboratorPopupComponent', () => {
  let component: CollaboratorPopupComponent;
  let fixture: ComponentFixture<CollaboratorPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CollaboratorPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CollaboratorPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
