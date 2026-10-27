import {Term} from "./Term";
import {Environment} from "../types/Environment";
import {Type} from "../types/Type";
import {Bool} from "../types/Bool";
import {Literal} from "./Literal";

export class False extends Literal {

    clone(): Term {
        return new False();
    }

    type_of(e: Environment): Type {
        return new Bool();
    }

}