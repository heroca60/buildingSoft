import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioPedidoComponent } from './inventario-pedido.component';

describe('InventarioPedidoComponent', () => {
  let component: InventarioPedidoComponent;
  let fixture: ComponentFixture<InventarioPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InventarioPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
