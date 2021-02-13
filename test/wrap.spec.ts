import TyppE          from '../src/TyppE';
import { DIRECTIONS } from '../src/ITypeEState';

describe('Wrapping behavior', () => {
    let typeE: TyppE;

    beforeEach(() => {
        typeE.resetState();
    });

    beforeAll(() => {
        typeE = TyppE.getInstance();
    });

    test('Wrap North', async () => {
        await typeE.run('test/input-test-cases/wrapN.txt');
        expect(typeE.getState()).toEqual({x: 0, y: 0, direction: DIRECTIONS.NORTH});
    });

    test('Wrap South', async () => {
        await typeE.run('test/input-test-cases/wrapS.txt');
        expect(typeE.getState()).toEqual({x: 0, y: 99, direction: DIRECTIONS.SOUTH});
    });

    test('Wrap East', async () => {
        await typeE.run('test/input-test-cases/wrapE.txt');
        expect(typeE.getState()).toEqual({x: 0, y: 0, direction: DIRECTIONS.EAST});
    });

    test('Wrap West', async () => {
        await typeE.run('test/input-test-cases/wrapW.txt');
        expect(typeE.getState()).toEqual({x: 99, y: 0, direction: DIRECTIONS.WEST});
    });
});
