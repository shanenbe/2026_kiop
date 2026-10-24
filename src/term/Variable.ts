import {Term} from "./Term.js";
import {Abstraction} from "./Abstraction";

export class Variable extends Term {

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