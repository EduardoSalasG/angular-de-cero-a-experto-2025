function addNumbers(a: number,b: number) {
    return a+b;
}

const addnumbersArrow = (a: number, b: number): string => {
    return `${a+b}`;
}

function multiply(firstNumber: number, secondNumber?: number, base: number= 2) {
return firstNumber *  base;

}

// const result: number = addNumbers(1,2);
// const result2: string = addnumbersArrow(1,2);
// const result3: number = multiply(1);
// console.log({result, result2, result3})

interface Character {
    name: string;
    hp: number;
    showHp: () => void;
}

const healCharacter = (character: Character, ammount: number ) => {

character.hp += ammount;

}

const strider: Character = {
    name: 'Strider',
    hp: 50,
    showHp() {
        console.log(`Puntos de vida ${this.hp}`)
    }
}

healCharacter(strider, 10)
healCharacter(strider, 50)


export {}