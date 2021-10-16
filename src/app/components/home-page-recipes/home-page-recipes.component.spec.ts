import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePageRecipesComponent } from './home-page-recipes.component';

describe('HomePageRecipesComponent', () => {
  let component: HomePageRecipesComponent;
  let fixture: ComponentFixture<HomePageRecipesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomePageRecipesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePageRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
