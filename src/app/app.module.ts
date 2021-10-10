import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HeadBarComponent } from './components/head-bar/head-bar.component';
import { RecipeService } from './services/recipe.service';
import { CategoryService } from './services/category.service';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeadBarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule, FormsModule
  ],
  providers: [CategoryService,RecipeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
