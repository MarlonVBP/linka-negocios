import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasosDeSucessoComponent } from './casos-de-sucesso.component';

describe('CasosDeSucessoComponent', () => {
  let component: CasosDeSucessoComponent;
  let fixture: ComponentFixture<CasosDeSucessoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasosDeSucessoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasosDeSucessoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
