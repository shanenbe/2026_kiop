import {Environment} from "../types/Environment";
import {Type} from "../types/Type";

export abstract class Term {
    abstract reduce(): Term;
    abstract replace(name: string, t: Term) : Term;

    abstract clone(): Term;
    
    abstract FI(): string[];

    abstract is_reducible(): boolean;

    abstract type_of(e: Environment): Type;

    abstract is_function(): boolean;

}