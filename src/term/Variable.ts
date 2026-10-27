import {Term} from "./Term.js";
import {Abstraction} from "./Abstraction";
import { Environment } from "../types/Environment.js";
import { Type } from "../types/Type.js";

export class Variable extends Term {

    /*
         (x:T) € E
         ===========
         E |- x : T
     */
    type_of(e: Environment): Type {
        let index = e.index_of(this.name);
        if(index != -1)
            return e.elements[index].type;
        else
            throw "unknown variable in environment: " + this.name;
    }

    is_reducible(): boolean {
        return false;
    }

    name: string;

    /*
         [x := s] x (x == x) -> s
         [y := s] x (x != y) -> x
      */

    replace(name: string, t: Term): Term {
        if (this.name == name) {
            return t.clone();
        } else {
            return t.clone();
        }
    }

    clone(): Term {
        return new Variable(this.name);
    }

    constructor(name: string) {
        super();
        this.name = name;
    }

    /**
     * [x := s] x ....
     * [x := s] y ....
     * [x := s] t1 t2 ....
     * [x := s] Lx.t ....
     * @constructor
     */



    /**
     * FI(x)  = {x}
     * FI(t1 t2)...
     * FI(Lx.t)...
     *
     */
    FI():string[] {
        return [this.name];
    }


    reduce(): Term {
        throw new Error("Method not implemented.");
    }
}