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
    this.categoryService.deleteCategory(id).subscribe(
      (response) => {
        console.log("category with id : " , id , "deleted")
        console.log(response);
        
      },
      (error : HttpErrorResponse ) =>{
        alert(error.message);
      }
    )

    
    
  }

}
