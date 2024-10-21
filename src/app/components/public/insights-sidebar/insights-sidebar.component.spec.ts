import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsightsSidebarComponent } from './insights-sidebar.component';

describe('InsightsSidebarComponent', () => {
  let component: InsightsSidebarComponent;
  let fixture: ComponentFixture<InsightsSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InsightsSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InsightsSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
