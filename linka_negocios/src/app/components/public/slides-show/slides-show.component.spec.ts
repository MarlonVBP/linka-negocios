import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesShowComponent } from './slides-show.component';

describe('SlidesShowComponent', () => {
  let component: SlidesShowComponent;
  let fixture: ComponentFixture<SlidesShowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlidesShowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlidesShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
