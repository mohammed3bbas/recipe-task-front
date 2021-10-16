import { HttpErrorResponse } from '@angular/common/http';
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from './models/category';
import { Recipe } from './models/recipe';
import { CategoryService } from './services/category.service';
import { RecipeService } from './services/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
 





}

