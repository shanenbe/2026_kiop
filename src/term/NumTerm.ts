import {Term} from "./Term";
import {Environment} from "../types/Environment";
import {Type} from "../types/Type";
import {Bool} from "../types/Bool";
import {Literal} from "./Literal";
import {Num} from "../types/Num";

export class NumTerm extends Literal {

    num: number;

    constructor(num: number) {
        super();
        this.num = num;
    }


    clone(): Term {
        return new NumTerm(this.num);
    }

    type_of(e: Environment): Type {
        return new Num();
    }

}