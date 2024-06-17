import { TestBed } from '@angular/core/testing';

import { ObtenerListaUsuariosService } from './obtener-lista-usuarios.service';

describe('ObtenerListaUsuariosService', () => {
  let service: ObtenerListaUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObtenerListaUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
