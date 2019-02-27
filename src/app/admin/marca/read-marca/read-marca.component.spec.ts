import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadMarcaComponent } from './read-marca.component';

describe('ReadMarcaComponent', () => {
  let component: ReadMarcaComponent;
  let fixture: ComponentFixture<ReadMarcaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadMarcaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadMarcaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
