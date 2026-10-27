import {Type} from "./Type";

export class Association {
    varname: string;
    type: Type;


    constructor(varname: string, type: Type) {
        this.varname = varname;
        this.type = type;
    }

    clone() {
        return new Association(this.varname, this.type);
    }
}