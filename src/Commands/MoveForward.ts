import { ICommand }   from './ICommand';
import { Command }    from '../Decorators/Command';
import TyppE          from '../TyppE';
import { DIRECTIONS } from '../ITypeEState';

@Command('M')
export class MoveForward implements ICommand {
    public static changePos(origin: number, places: number, axis: 'x' | 'y'): number {
        let result = origin + places;

        while (result > TyppE.GRID_SIZE[axis]) {
            result -= (TyppE.GRID_SIZE[axis] + 1);
        }

        while (result < 0) {
            result += (TyppE.GRID_SIZE[axis] + 1);
        }

        return result;
    }

    public trigger(places: number = 1): void {
        const state = TyppE.getInstance().getState();

        switch (state.direction) {
            case DIRECTIONS.NORTH:
                state.y = MoveForward.changePos(state.y, places, 'y');
                break;

            case DIRECTIONS.EAST:
                state.x = MoveForward.changePos(state.x, places, 'x');
                break;

            case DIRECTIONS.SOUTH:
                state.y = MoveForward.changePos(state.y, -places, 'y');
                break;

            case DIRECTIONS.WEST:
                state.x = MoveForward.changePos(state.x, -places, 'x');
                break;
        }
    }
}
