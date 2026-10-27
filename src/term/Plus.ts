import {Literal} from "./Literal";
import {Term} from "./Term";
import {Environment} from "../types/Environment";
import {Type} from "../types/Type";
import {FunctionType} from "../types/FunctionType";
import {Bool} from "../types/Bool";
import {True} from "./True";
import {False} from "./False";
import {Num} from "../types/Num";

export class Plus extends Literal {

    clone(): Term {
        return new Plus();
    }

    // T-plus: +: Number -> Number -> Number
    type_of(e: Environment): Type {
        return new FunctionType(new Num(), new FunctionType(new Num(), new Num()));
    }

    is_function(): boolean {
        return true;
    }

    apply_parameter(term: Term): Term {


        throw "Something's seriously wrong.....this must no occur in type checked program";

    }
}