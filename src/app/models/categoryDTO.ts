export class CategoryDTO{
    categoryId : number
    name : string

    constructor(name : string , categoryId? : number){
        this.name = name;
        if (typeof categoryId !== 'undefined'){
            this.categoryId = categoryId;
          }
    }
}