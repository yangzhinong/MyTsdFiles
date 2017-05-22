import "./ed.js";

declare var x: number;

var y = 10;
console.log(x);

function isNumber(x: any): x is number {
    return typeof x === 'number';
}


class Fish {
    swim() {
        console.log('swim');
    }
}

class Bird {
    fly() {
        console.log('fly');
    }
}

function isFish(pet: Fish | Bird): pet is Fish {

    return (<Fish>pet).swim !== undefined;

}

var oPet = <Bird>{};

function test(pet: Fish | Bird) {
    if (isFish(pet)) {
        pet.swim();
    }
    else {
        pet.fly();
    }
}


type Easing = "ease-in" | "ease-out" | "ease-in-out";


