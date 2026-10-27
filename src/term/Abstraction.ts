import {Term} from "./Term.js";
import {Environment} from "../types/Environment";
import {Type} from "../types/Type";
import {FunctionType} from "../types/FunctionType";
import {LambdaFunction} from "./LambdaFunction";

export class Abstraction extends Term implements LambdaFunction {


    constructor(param_name: string, type: Type, body: Term) {
        super();
        this.param_name = param_name;
        this.type = type;
        this.body = body;
    }

    apply_parameter(term: Term): Term {
        return this.body.clone().replace(this.param_name, term)
    }

    param_name: string;
    type: Type;
    body: Term;

    reduce(): Term {
        throw new Error("Method not implemented.");
    }

    clone(): Term {
        return new Abstraction(this.param_name, this.type, this.body.clone());
    }

    /*
     [x := s] Lx.t = .................................. FI
    */
    replace(name: string, t: Term): Term {
        //        x != y                 FI(s)
        if((this.param_name !== name) && !t.FI().includes(this.param_name))
            return new Abstraction(this.param_name, this.type, this.body.replace(this.param_name, t));
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

    type_of(e: Environment): Type {

        let new_environment = e.new_Enviroment_with(this.param_name, this.type);
        let right_type = this.body.type_of(new_environment);

        return new FunctionType(this.type, right_type);

    }

    is_function(): boolean {
        return true;
    }
}