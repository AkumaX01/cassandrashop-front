import { TestBed } from '@angular/core/testing';

import { AgregarProductoService } from './agregar-producto.service';

describe('AgregarProductoService', () => {
  let service: AgregarProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgregarProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
