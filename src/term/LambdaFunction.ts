// t1 t2
import {Term} from "./Term.js";
import {Abstraction} from "./Abstraction.js";
import { Environment } from "../types/Environment.js";
import { Type } from "../types/Type.js";
import {FunctionType} from "../types/FunctionType";

export interface LambdaFunction {
    apply_parameter(term: Term): Term;
}