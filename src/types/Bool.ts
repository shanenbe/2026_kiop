import {Type} from "./Type";

export class Bool extends Type {

    equals(other: Type): boolean {
        return other instanceof Bool;
    }

}