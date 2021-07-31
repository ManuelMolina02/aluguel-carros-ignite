import { Category } from '../model/Category';
import {
    ICategoriesRepository,
    ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
    // atribuindo modelo de categorias no array
    private categories: Category[];

    constructor() {
        // para chamar os atributos de dentro da classe ultilizamos o 'this'
        this.categories = [];
    }

    create({ name, description }: ICreateCategoryDTO): void {
        // criar um novo objeto chamado category
        // utilizamos o 'new' para conseguir criar/ chamar o construtor dentro da classe
        const category = new Category();

        // função que permite passar um objeto e quais atributos cada item deve corresponder
        Object.assign(category, {
            name,
            description,
            created_at: new Date(),
        });

        // criar uma nova categoria em categorias
        this.categories.push(category);
    }
    //
    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category {
        const category = this.categories.find(
            category => category.name === name,
        );
        return category;
    }
}

export { CategoriesRepository };
