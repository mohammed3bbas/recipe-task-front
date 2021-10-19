export class CategoryDTO {
    categoryId: number
    name: string

    constructor(categoryId: number, name: string) {
        this.name = name;
        this.categoryId = categoryId;
    }
}