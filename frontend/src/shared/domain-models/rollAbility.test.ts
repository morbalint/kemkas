import {RollAbility} from "./rollAbility";

describe('RollAbility', () => {
    it('returns 3 if all rolls are 1', () => {
        const actual = RollAbility({
            d6: () => 1
        })
        expect(actual).toEqual(3)
    })
    it('returns 18 if at least 3 rolls are 6', () => {
        let counter = 0;
        const actual = RollAbility({
            d6: () => {
                return ++counter > 1 ? 6 : 1;
            }
        })
        expect(actual).toEqual(18)
    })
    it('sums up rolls are removes the smallest roll', () => {
        let counter = 1;
        const actual = RollAbility({
            d6: () => {
                if (counter++ > 4) {
                    throw "Cheater! You can only roll 4 times!"
                }
                return counter
            }
        })
        expect(actual).toEqual(12)
    })
})