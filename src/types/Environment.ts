import {Association} from "./Association";
import {Type} from "./Type";

export class Environment {

    constructor(elements: Association[]) {
        this.elements = elements;
    }

    elements: Association[];

    // Entspricht ,-Operator
    new_Enviroment_with(variable_name: string, type: Type) {
        let ret: Environment = this.clone();

        let index = this.index_of(variable_name);
        if(index == -1) {
            ret.elements.push(new Association(variable_name, type));
        } else {
            ret.elements[index] = new Association(variable_name, type);
        }

        return ret;
    }

    index_of(var_name: string): number {
        for (let i = 0; i < this.elements.length; i++) {
            if(this.elements[i].varname == var_name) {
                return i;
            }
        }
        return -1;
    }

    clone() {
        let associations: Association[] = [];
        for(let e of this.elements) {
            associations.push(e.clone());
        }
        return new Environment(associations);
    }

}