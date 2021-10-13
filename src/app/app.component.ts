import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from './models/category';
import { Recipe } from './models/recipe';
import { CategoryService } from './services/category.service';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  recipes : Recipe[]
  deleteRecipe: Recipe;
  editRecipe: Recipe;
  categories: Category[];
  

  constructor(private recipeService : RecipeService ){}
  
  ngOnInit():  void{
    this.getAllRecipes();
  }
;

  public getAllRecipes() : void {
    this.recipeService.getAllRecipes().subscribe(
      (response : Recipe[]) => {
        console.log(response);
        this.recipes = response;
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )
  }



  public onAddRecipe(addForm: NgForm): void {
    document.getElementById('add-recipe-form').click();
    this.recipeService.addRecipe(addForm.value).subscribe(
      (response: Recipe) => {
        console.log(response);
        this.getAllRecipes();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  public onOpenModal(recipe: Recipe, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addRecipeModal');
    }
    // if (mode === 'edit') {
    //   this.editRecipe = recipe;
    //   button.setAttribute('data-target', '#updateRecipeModal');
    // }
    // if (mode === 'delete') {
    //   this.deleteRecipe = recipe;
    //   button.setAttribute('data-target', '#deleteRecipeModal');
    // }
    container.appendChild(button);
    button.click();
  }

  public searchBoxEvent(searchValue : string){
    console.log("111");
    console.log("from app comp ", searchValue);
    this.recipeService.getRecipesByName(searchValue).subscribe(
      (response : Recipe[]) => {
        console.log(response);
        this.recipes = response;
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )
  }
}

