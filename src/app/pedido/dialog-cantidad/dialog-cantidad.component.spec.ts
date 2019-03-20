import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCantidadComponent } from './dialog-cantidad.component';

describe('DialogCantidadComponent', () => {
  let component: DialogCantidadComponent;
  let fixture: ComponentFixture<DialogCantidadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCantidadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCantidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
