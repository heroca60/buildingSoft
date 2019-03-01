import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInventarioComponent } from './create-inventario.component';

describe('CreateInventarioComponent', () => {
  let component: CreateInventarioComponent;
  let fixture: ComponentFixture<CreateInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
