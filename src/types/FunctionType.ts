import {Type} from "./Type";

export class FunctionType extends Type {

    left: Type;
    right: Type

    constructor(left: Type, right: Type) {
        super();
        this.left = left;
        this.right = right;
    }

    equals(other: Type): boolean {
        if (other instanceof FunctionType)
            return this.left.equals(other.left) && this.right.equals(other.right);
        else
            return false;
    }

}