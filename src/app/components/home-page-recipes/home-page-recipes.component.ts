import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Recipe } from 'src/app/models/recipe';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-home-page-recipes',
  templateUrl: './home-page-recipes.component.html',
  styleUrls: ['./home-page-recipes.component.css']
})
export class HomePageRecipesComponent implements OnInit {

  addMode: boolean = false


  recipes: Recipe[]

  categories: Category[];


  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.getAllRecipes();
  }
  ;

  public getAllRecipes(): void {
    this.recipeService.getAllRecipes().subscribe(
      (response: Recipe[]) => {
        console.log(response);
        this.recipes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }
  searchRecipeByName(searchValue: string) {
    this.recipeService.getRecipesByName(searchValue).subscribe(
      (response: Recipe[]) => {
        console.log(response);
        if (response !== null) {
          this.recipes = response;
        }

      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    )
  }


  public searchBoxEvent(searchValue: string) {
    console.log("from app comp ", searchValue);
    if (searchValue !== "") {
      this.searchRecipeByName(searchValue);
    }
    else {
      this.getAllRecipes();
    }

  }


  public deleteRecipe(id: number) {
    if (confirm("Are you sure to delete ? ")) {
      console.log(id)
      console.log(typeof id)

      this.recipeService.deleteRecipe(id).subscribe(
        (response) => {

          console.log(response);
          this.getAllRecipes();
        },
        (error: HttpErrorResponse) => {
          console.log(error.status)
          alert(error.message);
        }
      )
    }





  }
 


  public filterEvent(name: string) {
    this.addMode = false
    this.getAllRecipes()

    console.log("start filtering from app comp on category : ", name)

    if (name !== "all") {
      this.searchRecipeByCategoryName(name);
    }
    // else {
    //   this.getAllRecipes();
    // }



  }

  chooseHeadBarEvent(mode: string) {

    if (mode === "addFormViewMode") {
      this.addModeChange()
    }
    else {
      this.addMode = false;
      this.searchBoxEvent(mode)
    }

  }


  searchRecipeByCategoryName(name: string) {
    console.log("from app component", name)
    this.recipeService.getRecipesByCategoryName(name).subscribe(
      (response: Recipe[]) => {
        console.log(response);
        this.recipes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }

    )

  }

  addModeChange() {
    // console.log(nav)
    this.addMode = !this.addMode
    this.getAllRecipes()
  }


}
