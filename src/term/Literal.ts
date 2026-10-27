import {Term} from "./Term";
import {Environment} from "../types/Environment";
import {Type} from "../types/Type";

export abstract class Literal extends Term {

    FI(): string[] {
        return [];
    }

    is_reducible(): boolean {
        return false;
    }

    reduce(): Term {
        throw "Literals not reducible"
    }

    replace(name: string, t: Term): Term {
        return this.clone();
    }

}
