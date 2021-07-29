// importando uuidV4
import { v4 as uuidV4 } from 'uuid';

/*
class [nameClass] {
    exampleID: string;
    exampleatt: string;
    otherexample: number;
    created_at: Date;

    constructor() {
        // se o ID não existir execute, se não continue
        if (!this.exampleID) {
            // criar um novo ID
            this.exampleID = uuidV4();
            
        }
    }
}

*/

// criando classe para categorias
class Category {
    // '?:' significa que o atributo é opcional
    id?: string;
    name: string;
    description: string;
    created_at: Date;

    // constructor pode ser utilizado quando temos uma classe instanciada
    constructor() {
        // se o ID não existir execute, se não continue
        if (!this.id) {
            // criar um novo ID
            this.id = uuidV4();
        }
    }
}

// exportando atributos da classe
export { Category };
