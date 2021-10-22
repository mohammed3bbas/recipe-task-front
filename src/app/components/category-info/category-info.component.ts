import { CategoryDTO } from './../../models/categoryDTO';
import { CategoryService } from 'src/app/services/category.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-info',
  templateUrl: './category-info.component.html',
  styleUrls: ['./category-info.component.css']
})
export class CategoryInfoComponent implements OnInit {
  readonly : boolean = true;
  categories: Category[];
  categoryNames: string[] = [];
  category: Category;

  constructor(private route: ActivatedRoute,private categoryService : CategoryService) { }

  ngOnInit(): void {

    console.log("info component ")
    this.getAllCategories();
    

    this.route.paramMap.subscribe(prams => {
      console.log(prams.get("id"))
      let name = prams.get("id")
      console.log(name);
      this.categoryService.getCategoryByName(name).subscribe(
        (response: Category) => {
          console.log(response);
          this.category = response;

        },
        (error: HttpErrorResponse) => {
          alert(error.message);
        }
      )
    })

  }

  updateCategoryForm = new FormGroup({
    name : new FormControl("",
    [Validators.required 
      ,Validators.maxLength(50)
      ,Validators.pattern('^[a-zA-Z \-\']+')
      ,this.isUnique()
      ])
    })


    isUnique() : ValidatorFn {
      return (control: AbstractControl): ValidationErrors | null => {
        
        console.log(control.value)
        let newName = control.value 
        // console.log(this.addCategoryForm)
        if(this.categoryNames.includes(newName) && newName !== this.category.name){
          console.log("not uniqe")
          return {"isUniqueName" : true};
        }
        else{
          
          return null;
        }
        
      }
      
    }



    public getAllCategories() : void{
      this.categoryService.getAllCategories().subscribe(
        (response : Category[]) => {
          console.log(response);
          this.categories = response;
          this.categoryNames = this.categories.map(recipe => recipe.name);
        },
        (error : HttpErrorResponse ) =>{
          alert(error.message);
        }
      )
  
    }

    updateCategory(){
      console.log(this.updateCategoryForm.value)
      

      let categoryDTO = new CategoryDTO(
        this.updateCategoryForm.value.name,
        this.category.categoryId
      )
      console.log("categoryDTO object created .. ")
      console.log(categoryDTO);
      this.categoryService.updateCategory(categoryDTO).subscribe(
        (respone : Category) =>{
          console.log(respone)
          this.category = respone
              
        },
        (error : HttpErrorResponse ) =>{
          alert(error.message);
        }
      )
    }

    editMode() {
      // debugger


      console.log(this.category)
      console.log(this.category.categoryId)

      this.updateCategoryForm.patchValue(this.category)
   
      this.readonly = !this.readonly
      console.log(this.updateCategoryForm)
    }
  

  

}
