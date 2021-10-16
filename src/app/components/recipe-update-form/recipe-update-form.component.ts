import { RecipeService } from './../../services/recipe.service';
import { RecipeDTO } from './../../models/recipeDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup , ReactiveFormsModule, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { Recipe } from 'src/app/models/recipe';

@Component({
  selector: 'recipe-update-form',
  templateUrl: './recipe-update-form.component.html',
  styleUrls: ['./recipe-update-form.component.css']
})
export class RecipeUpdateFormComponent implements OnInit {
  categories: Category[];

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


  updateForm = new FormGroup({
    name : new FormControl("",[Validators.required , Validators.maxLength(50),Validators.pattern('^[a-zA-Z \-\']+')]),
    // Unique namee is neededdd to be defined !! 
    minutes: new FormControl("",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    categoryId : new FormControl("",[Validators.required,Validators.nullValidator]),
    imageUrl : new FormControl("")
    
  });

  updateRecipe(){
    console.log(this.updateForm.value)
    const recipeDTO = new RecipeDTO(this.updateForm.value.name,
      this.updateForm.value.minutes,
      this.updateForm.value.imageUrl,
      this.updateForm.value.categoryId,
      this.updateForm.value.recipeId)


    
    console.log("recipeDTO object updated .. ")
    console.log(recipeDTO);

    this.recipeService.updateRecipe(recipeDTO).subscribe(
      (respone : Recipe) =>{
        console.log(respone)
      },
      (error : HttpErrorResponse ) =>{
        
        alert(error.message);
      }
    )

  }

}
