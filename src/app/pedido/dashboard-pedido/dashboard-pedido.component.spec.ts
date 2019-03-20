import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardPedidoComponent } from './dashboard-pedido.component';

describe('DashboardPedidoComponent', () => {
  let component: DashboardPedidoComponent;
  let fixture: ComponentFixture<DashboardPedidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardPedidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
