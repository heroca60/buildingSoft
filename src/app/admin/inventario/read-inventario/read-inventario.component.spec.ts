import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadInventarioComponent } from './read-inventario.component';

describe('ReadInventarioComponent', () => {
  let component: ReadInventarioComponent;
  let fixture: ComponentFixture<ReadInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
