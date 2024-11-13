import { TestBed } from '@angular/core/testing';

import { EquipeLinkaNegociosService } from './equipe-linka-negocios.service';

describe('EquipeLinkaNegociosService', () => {
  let service: EquipeLinkaNegociosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EquipeLinkaNegociosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
