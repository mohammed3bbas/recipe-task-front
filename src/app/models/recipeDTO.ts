export class RecipeDTO{
    recipeId : number ;
    name : string;
    minutes : number;
    imageUrl : string;
    categoryId : number

    constructor(name :string , minutes :number, imageUrl : string , categryId : number) {
        this.name = name ;
        this.minutes = minutes;
        this.imageUrl = imageUrl;
        this.categoryId = categryId;
      }

}