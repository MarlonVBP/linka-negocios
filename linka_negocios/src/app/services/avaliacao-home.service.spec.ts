import { TestBed } from '@angular/core/testing';

import { AvaliacaoHomeService } from './avaliacao-home.service';

describe('AvaliacaoHomeService', () => {
  let service: AvaliacaoHomeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvaliacaoHomeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
