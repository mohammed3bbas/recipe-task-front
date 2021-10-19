import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryHeadBarComponent } from './category-head-bar.component';

describe('CategoryHeadBarComponent', () => {
  let component: CategoryHeadBarComponent;
  let fixture: ComponentFixture<CategoryHeadBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryHeadBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryHeadBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
