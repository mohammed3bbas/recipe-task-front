import { RecipeService } from './../../services/recipe.service';
import { RecipeDTO } from './../../models/recipeDTO';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup , ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  recipes: Recipe[];
  // recipeDTO : RecipeDTO
  names : String[]  = []
  // @Output() closeEvent = new EventEmitter<void>()
  

  constructor(private categoryService : CategoryService , private recipeService : RecipeService) { }

  ngOnInit(): void {
    this.getAllCategories();
    this.getAllRecipes();
  }

  public getAllRecipes(){
    this.recipeService.getAllRecipes().subscribe(
      (response : Recipe[]) => {
        console.log(response);
        this.recipes = response;
        this.names = this.recipes.map(recipe => recipe.name);
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


  addForm = new FormGroup({
    name : new FormControl("",
    [Validators.required 
      ,Validators.maxLength(50)
      ,Validators.pattern('^[a-zA-Z \-\']+')
      ,this.isUnique()
      ]),
    minutes: new FormControl("",[Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    categoryId : new FormControl("",[Validators.required,Validators.nullValidator]),
    imageUrl : new FormControl("")
    
  });


  isUnique() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      
      console.log(control.value)
      let newName = control.value 
      console.log(this.addForm)


      if(this.names.includes(newName)){
        console.log("not unique")

        return {"isUniqueName" : true};
      }
      else{
        // console.log("trio")
        return null;
      }
      
    }
    
  }

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

  // backToRecipes(){
  //   console.log("close")
  //   this.closeEvent.emit();
  //   console.log("closed")

  // }

  
  
}

