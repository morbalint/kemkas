import {d6} from "./kockak";

export function RollAbility(dependencies: {
    d6: () => number
} = {d6}) {
    const { d6: roll6 } = dependencies;
    let min = 6;
    let sum = 0;
    let rolls: number[] = []
    for (let i = 0; i < 4; i++) {
        const roll = roll6();
        if (roll < min) {
            min = roll;
        }
        sum += roll;
        rolls.push(roll)
    }
    const result = sum - min;
    console.log("Rolled: " + rolls + " got: " + result)
    return result;
}