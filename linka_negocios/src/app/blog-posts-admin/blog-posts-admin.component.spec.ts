import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostsAdminComponent } from './blog-posts-admin.component';

describe('BlogPostsAdminComponent', () => {
  let component: BlogPostsAdminComponent;
  let fixture: ComponentFixture<BlogPostsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostsAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
