import TyppE           from '../src/TyppE';
import { MoveForward } from '../src/Commands/MoveForward';
import { TurnRight }   from '../src/Commands/TurnRight';
import { TurnLeft }    from '../src/Commands/TurnLeft';

MoveForward.prototype.trigger = jest.fn();
describe('Commands trigger', () => {
    let typeE: TyppE;

    beforeAll(() => {
        typeE = TyppE.getInstance();
    });

    test('Example from test from email', async () => {
        MoveForward.prototype.trigger = jest.fn();
        TurnRight.prototype.trigger = jest.fn();
        TurnLeft.prototype.trigger = jest.fn();

        await typeE.run('test/input-test-cases/exampleTest.txt');

        expect(MoveForward.prototype.trigger).toHaveBeenCalledTimes(3);
        expect(TurnRight.prototype.trigger).toHaveBeenCalledTimes(1);
        expect(TurnLeft.prototype.trigger).toHaveBeenCalledTimes(1);
    });
});
