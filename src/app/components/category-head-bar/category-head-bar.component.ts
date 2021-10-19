import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'category-head-bar',
  templateUrl: './category-head-bar.component.html',
  styleUrls: ['./category-head-bar.component.css']
})
export class CategoryHeadBarComponent implements OnInit {
  @Output() addCategory = new EventEmitter<void>()

  constructor() { }

  ngOnInit(): void {
  }


  addCategoryFormView(){
    console.log("addCategoryFormView")
    this.addCategory.emit();
    console.log("finished")



  }

}
