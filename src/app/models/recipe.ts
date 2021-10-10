// import { Category } from "./category";

import { Category } from "./category";

export interface Recipe{
    id : number,
    name : string,
    minutes : number,
    imageUrl : string,
    category : Category
}