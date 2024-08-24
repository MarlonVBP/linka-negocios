import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotivosHomeComponent } from './motivos-home.component';

describe('MotivosComponent', () => {
  let component: MotivosHomeComponent;
  let fixture: ComponentFixture<MotivosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotivosHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MotivosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
