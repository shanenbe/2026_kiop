import {Literal} from "./Literal";
import {Term} from "./Term";
import {True} from "./True";
import {Environment} from "../types/Environment";
import {FunctionType} from "../types/FunctionType";
import {Bool} from "../types/Bool";
import {Type} from "../types/Type";
import {LambdaFunction} from "./LambdaFunction";
import {False} from "./False";

export class Not extends Literal implements LambdaFunction {

    clone(): Term {
        return new Not();
    }
    
    type_of(e: Environment): Type {
        return new FunctionType(new Bool(), new Bool());
    }

    is_function(): boolean {
        return true;
    }

    apply_parameter(term: Term): Term {
        if (term instanceof True)
            return new False();

        if (term instanceof False)
            return new True();

        throw "Something's seriously wrong.....this must no occur in type checked program";

    }

}