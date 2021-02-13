import TyppE          from '../src/TyppE';
import { DIRECTIONS } from '../src/ITypeEState';

describe('General', () => {
    let typeE: TyppE;

    beforeAll(() => {
        typeE = TyppE.getInstance();
    });

    beforeEach(() => {
        typeE.resetState();
    });

    test('Example from test from email', async () => {
        await typeE.run('test/input-test-cases/exampleTest.txt');

        expect(typeE.getState()).toEqual({x: 4, y: 99, direction: DIRECTIONS.SOUTH});
    });
});
