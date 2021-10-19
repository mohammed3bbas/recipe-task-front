import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { RecipeAddFormComponent } from './components/recipe-add-form/recipe-add-form.component';
import { RecipeUpdateFormComponent } from './components/recipe-update-form/recipe-update-form.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomePageRecipesComponent } from './components/home-page-recipes/home-page-recipes.component';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { CategoryHeadBarComponent } from './components/category-head-bar/category-head-bar.component';
import { CategoryAddFormComponent } from './components/category-add-form/category-add-form.component';
import { RecipeInfoComponent } from './components/recipe-info/recipe-info.component';
import { CategoryInfoComponent } from './components/category-info/category-info.component';


@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SidebarComponent,
    RecipeAddFormComponent,
    RecipeUpdateFormComponent,
    NotFoundComponent,
    HomePageRecipesComponent,
    CategoryPageComponent,
    CategoryHeadBarComponent,
    CategoryAddFormComponent,
    RecipeInfoComponent,
    CategoryInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, 
    FormsModule, 
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path : '' , component : HomePageRecipesComponent },
      {path : 'recipes' , component : HomePageRecipesComponent },
      {path : 'recipes/:id', component : RecipeInfoComponent },
      {path : 'categories' , component : CategoryPageComponent},
      {path : 'categories/:id' , component : CategoryInfoComponent},
      {path : '**', component : NotFoundComponent }
    ])

  ],
  providers: [CategoryService,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
