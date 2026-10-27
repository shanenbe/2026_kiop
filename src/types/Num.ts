import {Type} from "./Type";

export class Num extends Type {

    equals(other: Type): boolean {
        return other instanceof Num;
    }

}