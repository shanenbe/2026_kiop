// t1 t2
import {Term} from "./Term.js";
import {Abstraction} from "./Abstraction.js";
import {LambdaFunction} from "./LambdaFunction.js";
import { Environment } from "../types/Environment.js";
import { Type } from "../types/Type.js";
import {FunctionType} from "../types/FunctionType";

export class Application extends Term {

    left: Term;
    right: Term;

    /*
         E |- t1: T' -> T    E |- t2: T'
         ===============================
                E |- t1 t2: T
     */
    type_of(e: Environment): Type {
        let left_type = this.type_of(e);

        if(!(left_type instanceof Type)) {
            throw "Invalid type. Term has no Function Type";
        }

        let left_function_type = left_type as FunctionType;

        let right_type = this.right.type_of(e);

        if (! (right_type).equals(left_function_type.left))
            throw "Invalid type";

        return left_function_type.right;

    }

    is_reducible(): boolean {

        if(this.left.is_reducible()) {return true}

        if(this.right.is_reducible()) {return true}

        if (this.left instanceof Abstraction) {return true}

        return false;

    }
    clone(): Term {
        return new Application(this.left.clone(), this.right.clone());
    }


    constructor(left: Term, right: Term) {
        super();
        this.left = left;
        this.right = right;
    }


    // (Lx.t1) t2 -> [x := t2] t1
    reduce(): Term {

        if(this.left.is_reducible()) {
            return new Application(this.left.reduce(), this.right.clone());
        }

        if(this.right.is_reducible()) {
            return new Application(this.left.clone(), this.right.reduce());
        }

        if (this.left.is_function()) {
            let f = (this.left as Object as LambdaFunction);
            return f.apply_parameter(this.right.clone());
        }


        throw "Something's seriously wrong";
    }

    /*
     [x := s] t1 t2 -> [x := s] t1  [x := s] t2
    */
    replace(name: string, t: Term): Term {
        return new Application(this.left.replace(name,t.clone()),
                               this.right.replace(
                                                    name,
                                                    t.clone()
                               )
        );
    }

    /**
     * FI(t1 t2) = F(t1) v F(t2)
     *
     */
    FI():string[] {
        let ret: string[] = [...this.left.FI()];

        let right = this.right.FI();

        for(let varName of right) {
            if(!ret.includes(varName))
                ret.push(varName);
        }

        return ret;
    }
    /**
     * FI(x)  = {x}
     * FI(t1 t2)...
     * FI(Lx.t)...
     *
     */

}