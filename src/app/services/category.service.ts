import { CategoryDTO } from './../models/categoryDTO';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
  // GETS 
  public getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiServerUrl}/category`);
  }
  public getCategoryByName(categoryName : string) : Observable<Category>{
    return this.http.get<Category>(`${this.apiServerUrl}/category/${categoryName}`);
  }
  // Delete 

  public deleteCategory(id : number) : Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/category/${id}`);
  }

  //POST
  public addCategory(category : CategoryDTO) : Observable<Category>{
    return this.http.post<Category>(`${this.apiServerUrl}/category`,category);
  }

  //PUT
  public updateCategory(category : CategoryDTO) : Observable<Category>{
    return this.http.put<Category>(`${this.apiServerUrl}/category`,category);
  }

}
