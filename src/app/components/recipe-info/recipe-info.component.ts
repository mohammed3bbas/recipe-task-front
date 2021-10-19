import { ValidationErrors } from '@angular/forms';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Recipe } from 'src/app/models/recipe';
import { CategoryService } from 'src/app/services/category.service';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Category } from 'src/app/models/category';
import { RecipeDTO } from 'src/app/models/recipeDTO';
import { AlertPromise } from 'selenium-webdriver';

@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrls: ['./recipe-info.component.css']
})
export class RecipeInfoComponent implements OnInit {
  recipe: Recipe
  readonly: boolean = true
  names: string[] = []
  categories: Category[];
  recipes: Recipe[] ;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private categoryService: CategoryService) { }
  
  updateForm = new FormGroup({
    name: new FormControl("",
      [Validators.required
        , Validators.maxLength(50)
        , Validators.pattern('^[a-zA-Z \-\']+')
        , this.isUnique()
      ]),
    minutes: new FormControl("", [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    categoryId: new FormControl("", [Validators.required, Validators.nullValidator]),
    imageUrl: new FormControl("")

  });


  ngOnInit(): void {

    this.getAllRecipes();

    this.route.paramMap.subscribe(prams => {
      console.log(prams.get("id"))
      let id = +prams.get("id")

      this.recipeService.getRecipeById(id).subscribe(
        (response: Recipe) => {
          console.log(response);
          this.recipe = response;

        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    })
    this.getAllCategories()
    
  }

  public getAllRecipes(){
    this.recipeService.getAllRecipes().subscribe(
      (response : Recipe[]) => {
        console.log(response);
        this.recipes = response;
        this.names = this.recipes.map(recipe => recipe.name);
        // removeRecipeName(this.recipe?.name)
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )
  }

  public getAllCategories() : void{
    this.categoryService.getAllCategories().subscribe(
      (response : Category[]) => {
        console.log(response);
        this.categories = response;
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )

  }

  editMode() {
    // debugger
    
    let {category , ...recipeTextFields} = this.recipe;

    // console.log(category,recipeTextFields)
    // console.log(this.recipe)
    recipeTextFields['categoryId'] = category.categoryId
    // console.log("----------------------",category,recipeTextFields,"----------------------")

    this.updateForm.patchValue(recipeTextFields )
 
    this.readonly = !this.readonly
    console.log(this.updateForm)
  }


  isUnique(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      // debugger
      // console.log(control.value)
      let key = control.value
      // console.log(this.updateForm)
      if (this.names.includes(key) && key !== this.recipe.name) {
        console.log("not unique")

        return { "isUniqueName": true };
      }
      else {
        // console.log("trio")
        return null;
      }

    }

  }


  updateRecipe(){
    console.log(this.updateForm.value)
    const recipeDTO = new RecipeDTO(
      this.updateForm.value.name,
      this.updateForm.value.minutes,
      this.updateForm.value.imageUrl,
      this.updateForm.value.categoryId,
      this.recipe.recipeId
      )

    console.log("recipeDTO object created .. ")
    console.log(recipeDTO);
    this.recipeService.updateRecipe(recipeDTO).subscribe(
      (respone : Recipe) =>{
        console.log(respone)
        this.recipe = respone
        
        
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )

    

  }

  



}

