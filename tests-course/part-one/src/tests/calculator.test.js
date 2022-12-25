import { sum, subtract } from '../calculator'

describe("caculator sum", () => {
    test("it should sum two positive values", () => {
        //execute
        const result = sum(2, 2);

        //assert
        expect(result).toBe(4);
    });

    test("it should sum numbers with a negative value", () => {
        //execute
        const result = sum(2, -2);

        //assert
        expect(result).toBe(0);
    });
});


describe("caculator subtract", () => {
    test("it should subtract two positive values", () => {
        //execute
        const result = subtract(2, 2);

        //assert
        expect(result).toBe(0);
    });
});