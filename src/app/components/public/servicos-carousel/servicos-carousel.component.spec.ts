import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServicosCarouselComponent } from './servicos-carousel.component';

describe('ServicosCarouselComponent', () => {
  let component: ServicosCarouselComponent;
  let fixture: ComponentFixture<ServicosCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServicosCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServicosCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
