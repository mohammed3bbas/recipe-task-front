import { RecipeService } from './../../services/recipe.service';
import { RecipeDTO } from './../../models/recipeDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'recipe-add-form',
  templateUrl: './recipe-add-form.component.html',
  styleUrls: ['./recipe-add-form.component.css']
})
export class RecipeAddFormComponent implements OnInit {

  categories: Category[];
  // recipeDTO : RecipeDTO
  

  constructor(private categoryService : CategoryService , private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.getAllCategories();
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


  addForm = new FormGroup({
    name : new FormControl("",[Validators.required , Validators.maxLength(50)]),
    // Unique namee is neededdd to be defined !! 
    minutes: new FormControl("",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    categoryId : new FormControl("",[Validators.required,Validators.nullValidator]),
    imageUrl : new FormControl("")
    
  });

  addRecipe(){
    console.log(this.addForm.value)
    const recipeDTO = new RecipeDTO(this.addForm.value.name,
      this.addForm.value.minutes,
      this.addForm.value.imageUrl,
      this.addForm.value.categoryId)


    
    console.log("recipeDTO object created .. ")
    console.log(recipeDTO);

    this.recipeService.addRecipe(recipeDTO).subscribe(
      (respone : Recipe) =>{
        console.log(respone)
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )

  }
  
}

