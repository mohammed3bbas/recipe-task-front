import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryAddFormComponent } from './category-add-form.component';

describe('CategoryAddFormComponent', () => {
  let component: CategoryAddFormComponent;
  let fixture: ComponentFixture<CategoryAddFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoryAddFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
