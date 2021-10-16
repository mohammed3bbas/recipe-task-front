// import { Category } from "./category";

import { Category } from "./category";

export interface Recipe{
    recipeId : number,
    name : string,
    minutes : number,
    imageUrl : string,
    category : Category
}