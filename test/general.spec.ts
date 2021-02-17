import DIRECTIONS from '../src/enum/directions';
import { run } from '../src/app';

describe('General', () => {
    test('Example from test from email', async () => {
        expect(await run('test/input-test-cases/exampleTest.txt'))
            .toEqual({x: 4, y: 99, direction: DIRECTIONS.SOUTH});
    });
});
