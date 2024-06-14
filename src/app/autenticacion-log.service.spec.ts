import { TestBed } from '@angular/core/testing';

import { AutenticacionLogService } from './autenticacion-log.service';

describe('AutenticacionLogService', () => {
  let service: AutenticacionLogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AutenticacionLogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
