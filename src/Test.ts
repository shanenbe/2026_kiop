import {Variable} from "./term/Variable.js";
import {Abstraction} from "./term/Abstraction.js";
import {Term} from "./term/Term.js";
import {Application} from "./term/Application.js";

function is_true(b: boolean) {
    if(b != true)
        throw "Kapott";
}

function V(n: string) {
    return new Variable(n);
}

function Abs(n: string, b: Term) {
    return new Abstraction(n, b);
}

function App(t1: Term, t2: Term) {
    return new Application(t1, t2);
}

function id_function(v: string) {
    return new Abstraction(v, V(v));
}

// ((Lx.x) y) z
let lTerm = App(App(Abs("x", V("x")), V("y")), V("z"));

// ((Lx.x) y) z -> y z
let reduced = lTerm.reduce()
is_true(reduced instanceof Application);
is_true((reduced as Application).left instanceof Variable);
is_true(((reduced as Application).left as Variable).name == "y");
is_true(((reduced as Application).right as Variable).name == "z");

let fi_xy = App(V("x"), V("y")).FI();
is_true(fi_xy.length == 2);
is_true(fi_xy[0] == "x");
is_true(fi_xy[1] == "y");

// ((Lx.x) (Ly.y))) ((Lz.z) a) -> (Ly.y) ((Lz.z) a)
lTerm = App(
        App(id_function("x"), id_function("y")),
        App(id_function("z"), V("a"))
);

reduced = lTerm.reduce();


let fi_xx = App(V("x"), V("x")).FI();
is_true(fi_xx.length == 1);
is_true(fi_xx[0] == "x");

let fi_Lx_x = Abs("x", V("x")).FI();
is_true(fi_Lx_x.length == 0);


// id_function            = Lx.x
let id_f = Abs("x", V("x"));
let param = V("y");

// (Lx.x) y
let app = App(id_f, param);

// (Lx.x) y -> y
let result = app.reduce();
is_true(result instanceof Variable);
is_true((result as Variable).name == "y");


//
// is_true(result instanceof Variable);
// is_true((result as  Variable).name == "y");
//
//
//
//
