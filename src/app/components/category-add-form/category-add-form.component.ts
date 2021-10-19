import { CategoryDTO } from './../../models/categoryDTO';
import { Category } from './../../models/category';
import { CategoryService } from 'src/app/services/category.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, Validators, FormGroup, ValidatorFn } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'category-add-form',
  templateUrl: './category-add-form.component.html',
  styleUrls: ['./category-add-form.component.css']
})
export class CategoryAddFormComponent implements OnInit {
  @Output() closeCategoryAddFormEvent = new EventEmitter<void>()
  categories: Category[];
  categoryNames: string[] = [];
  
  
  
  constructor(private categoryService : CategoryService) { }

  ngOnInit(): void {
    this.getAllCategories()
  }


  addCategoryForm = new FormGroup({
    name : new FormControl("",
    [Validators.required 
      ,Validators.maxLength(50)
      ,Validators.pattern('^[a-zA-Z \-\']+')
      ,this.isUnique()
      ])
    })
  

  

  public getAllCategories() : void{
    this.categoryService.getAllCategories().subscribe(
      (response : Category[]) => {
        console.log(response);
        this.categories = response;
        this.categoryNames = this.categories.map(category =>category.name);
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )

  }

  isUnique() : ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      
      console.log(control.value)
      let newName = control.value 
      // console.log(this.addCategoryForm)


      if(this.categoryNames.includes(newName)){

        console.log("not uniqe")
        

        return {"isUniqueName" : true};
      }
      else{
        
        return null;
      }
      
    }
    
  }

  addCategory(){

    console.log(this.addCategoryForm.value)
    let categoryDTO = new CategoryDTO(this.addCategoryForm.value.name) 


    this.categoryService.addCategory(categoryDTO).subscribe(
      (respone : Category) =>{
        console.log(respone)
        this.closeCategoryAddFormEvent.emit()
      },
      (error : HttpErrorResponse ) =>{
        
        alert(error.message);
      }
    )




  }

  backToCategory(){

    this.closeCategoryAddFormEvent.emit()

  }

}
