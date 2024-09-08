import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsertBannerComponent } from './consert-banner.component';

describe('ConsertBannerComponent', () => {
  let component: ConsertBannerComponent;
  let fixture: ComponentFixture<ConsertBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsertBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsertBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
