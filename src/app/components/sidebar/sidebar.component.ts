import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  categories: Category[];
  @Output('filterEvent') filterEvent = new EventEmitter<string>();
  

  constructor(private categoryService : CategoryService) { }

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

  public filterChoice(name? : string){
    console.log("the category name will be filtered on ",name)
    if(typeof name !== 'undefined'){
    this.filterEvent.emit(name);
    }
    else{
      this.filterEvent.emit("all");

    }
    console.log("finshed emiting ")
    

    
  }

 

}
