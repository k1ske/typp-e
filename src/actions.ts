import PositionState from './types/position-state';
import DIRECTIONS from './enum/directions';
import { GRID_SIZE } from './app';

function move(repetitions: number, state: PositionState) {
    const changePos = (origin: number, places: number, axis: 'x' | 'y'): number => {
        let result = origin + places;

        while (result > GRID_SIZE[axis]) {
            result -= (GRID_SIZE[axis] + 1);
        }

        while (result < 0) {
            result += (GRID_SIZE[axis] + 1);
        }

        return result;
    };

    switch (state.direction) {
        case DIRECTIONS.NORTH:
            state.y = changePos(state.y, repetitions, 'y');
            break;

        case DIRECTIONS.EAST:
            state.x = changePos(state.x, repetitions, 'x');
            break;

        case DIRECTIONS.SOUTH:
            state.y = changePos(state.y, -repetitions, 'y');
            break;

        case DIRECTIONS.WEST:
            state.x = changePos(state.x, -repetitions, 'x');
            break;
    }
}

function turnRight(repetitions: number, state: PositionState) {
    let sanitizedDirection: number = state.direction + repetitions;

    while (sanitizedDirection > 4) {
        sanitizedDirection -= 4;
    }

    state.direction = <DIRECTIONS>sanitizedDirection;
}

function turnLeft(repetitions: number, state: PositionState) {
    let sanitizedDirection: number = state.direction - repetitions;

    while (sanitizedDirection < 1) {
        sanitizedDirection += 4;
    }

    state.direction = <DIRECTIONS>sanitizedDirection;
}

export {
    move,
    turnRight,
    turnLeft
};
