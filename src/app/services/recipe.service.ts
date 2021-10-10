import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  // GETS 
  public getAllRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipes`);
  }

  public getRecipeById(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.apiServerUrl}/recipes/${id}`);
  }



  public getRecipesByName(name: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipes/${name}`);
  }

  public getRecipesByCategoryName(name: string): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.apiServerUrl}/recipes/category?name=${name}`);
  }
  // POST
  public addRecipe(recipe : Recipe) : Observable<Recipe>{
    return this.http.post<Recipe>(`${this.apiServerUrl}/recipes`,recipe);
  }

  //PUT 
  public updateRecipe(recipe : Recipe) : Observable<Recipe>{
    return this.http.put<Recipe>(`${this.apiServerUrl}/recipes`,recipe);
  }

  //DELETE

  public deleteRecipe(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/recipes/${id}`);
  }




}
