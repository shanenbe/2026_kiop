import {Literal} from "./Literal";
import {Term} from "./Term";
import {Environment} from "../types/Environment";
import {Type} from "../types/Type";
import {FunctionType} from "../types/FunctionType";
import {Bool} from "../types/Bool";
import {True} from "./True";
import {False} from "./False";
import {Num} from "../types/Num";
import {Plus} from "./Plus";
import {NumTerm} from "./NumTerm";

export class PlusBound {

    bound_int: number;

    constructor(bound_int: number) {
        this.bound_int = bound_int;
    }

    // Übergang Lambda TypeScript
    apply_parameter(term: Term): Term {
        return new NumTerm(this.bound_int + (term as NumTerm).num)
    }

    clone(): Term {
        return new Plus();
    }

    // T-plus: +: Number -> Number -> Number
    type_of(e: Environment): Type {
        return new FunctionType(new Num(), new Num());
    }

    is_function(): boolean {
        return true;
    }


}