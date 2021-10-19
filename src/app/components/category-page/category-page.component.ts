import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent implements OnInit {
  addMode : boolean = false;
  categories: Category[];

  constructor(private categoryService : CategoryService ) { }

  ngOnInit(): void {
    console.log("category component !!")
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

  deleteCategory(id : number){
    console.log(typeof id)
    if (confirm("deleting category will delete all reciepes having this category, are you sure ?")) {
      
      this.categoryService.deleteCategory(id).subscribe(
        (response) => {
          this.getAllCategories();
          console.log("category with id : " , id , "deleted")
          console.log(response);
          
        },
        (error : HttpErrorResponse ) =>{
          alert(error.message);
        }
      )
    }

    
  }
  chanegeAddCategoryMode(){
    this.getAllCategories() 
    this.addMode = !this.addMode

    console.log(this.addMode)

  }

}
