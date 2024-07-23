import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InsightsListPostComponent } from './insights-list-post.component';



describe('InsightsListPostComponent', () => {
  let component: InsightsListPostComponent;
  let fixture: ComponentFixture<InsightsListPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsListPostComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightsListPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
