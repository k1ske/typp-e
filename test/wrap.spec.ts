import { run } from '../src/app';
import DIRECTIONS from '../src/enum/directions';

describe('Wrapping behavior', () => {
    test('Wrap North', async () => {
        expect(await run('test/input-test-cases/wrapN.txt'))
            .toEqual({x: 0, y: 0, direction: DIRECTIONS.NORTH});
    });

    test('Wrap South', async () => {
        expect(await run('test/input-test-cases/wrapS.txt'))
            .toEqual({x: 0, y: 99, direction: DIRECTIONS.SOUTH});
    });

    test('Wrap East', async () => {
        expect(await run('test/input-test-cases/wrapE.txt'))
            .toEqual({x: 0, y: 0, direction: DIRECTIONS.EAST});
    });

    test('Wrap West', async () => {
        expect(await run('test/input-test-cases/wrapW.txt'))
            .toEqual({x: 99, y: 0, direction: DIRECTIONS.WEST});
    });
});
