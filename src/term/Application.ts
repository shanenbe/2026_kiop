// t1 t2
import {Term} from "./Term.js";
import {Abstraction} from "./Abstraction.js";

export class Application extends Term {

    is_reducible(): boolean {

        if(this.left.is_reducible()) {return true}

        if(this.right.is_reducible()) {return true}

        if (this.left instanceof Abstraction) {return true}

        return false;

    }
    clone(): Term {
        return new Application(this.left.clone(), this.right.clone());
    }

    left: Term;
    right: Term;

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


        if (this.left instanceof Abstraction) {
           return this.left.body.clone().replace(this.left.param_name, this.right.clone())
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