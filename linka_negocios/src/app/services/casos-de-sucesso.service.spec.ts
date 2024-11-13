import { TestBed } from '@angular/core/testing';

import { CasosDeSucessoService } from './casos-de-sucesso.service';

describe('CasosDeSucessoService', () => {
  let service: CasosDeSucessoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CasosDeSucessoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
