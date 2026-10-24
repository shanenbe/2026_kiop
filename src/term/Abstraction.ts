import {Term} from "./Term.js";

export class Abstraction extends Term {

    constructor(param_name: string, body: Term) {
        super();
        this.param_name = param_name;
        this.body = body;
    }

    param_name: string;
    body: Term;

    reduce(): Term {
        throw new Error("Method not implemented.");
    }

    clone(): Term {
        return new Abstraction(this.param_name, this.body.clone());
    }

    /*
     [x := s] Lx.t = .................................. FI
    */
    replace(name: string, t: Term): Term {
        //        x != y                 FI(s)
        if((this.param_name !== name) && !t.FI().includes(this.param_name))
            return new Abstraction(this.param_name, this.body.replace(this.param_name, t));
        else
            throw "alpha conversion required!!!!!";
    }


    /**
     * FI(Lx.t) =  FI(t) - {x}
     */
    FI():string[] {

        let ret: string[] = []
        let bodyVars = this.body.FI();

        for(let varName of bodyVars) {
            if(!ret.includes(varName) && varName != (this.param_name))
                ret.push(varName);
        }

        return ret;
    }

    is_reducible(): boolean {
        return false;
    }


}