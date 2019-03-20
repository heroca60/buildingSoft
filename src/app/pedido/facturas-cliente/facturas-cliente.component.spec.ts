import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FacturasClienteComponent } from './facturas-cliente.component';

describe('FacturasClienteComponent', () => {
  let component: FacturasClienteComponent;
  let fixture: ComponentFixture<FacturasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FacturasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FacturasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
