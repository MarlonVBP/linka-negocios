import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipeLinkaNegociosComponent } from './equipe-linka-negocios.component';

describe('EquipeLinkaNegociosComponent', () => {
  let component: EquipeLinkaNegociosComponent;
  let fixture: ComponentFixture<EquipeLinkaNegociosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EquipeLinkaNegociosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EquipeLinkaNegociosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
