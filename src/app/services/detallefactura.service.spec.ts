import { TestBed } from '@angular/core/testing';

import { DetallefacturaService } from './detallefactura.service';

describe('DetallefacturaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DetallefacturaService = TestBed.get(DetallefacturaService);
    expect(service).toBeTruthy();
  });
});
