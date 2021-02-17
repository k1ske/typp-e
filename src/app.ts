import { getArgFlag, getArgValue } from './args-parser';
import { execCommand, loadCommandsFromFile } from './commands';
import DIRECTIONS from './enum/directions';
import CommandMap from './types/command-map';
import PositionState from './types/position-state';

const GRID_SIZE = {
    x: 99,
    y: 99
};
const INPUT_FILE_ARG = 'input';
const INPUT_OUTPUT_FLAG = 'json';

async function run(file: string): Promise<PositionState> {
    let state: PositionState = {
        x: 0,
        y: 0,
        direction: DIRECTIONS.NORTH
    };

    const commands: CommandMap[] = await loadCommandsFromFile(file);

    for (const command of commands) {
        execCommand(command.commandID, command.repetitions, state);
    }

    return state;
}

function printState(state: PositionState, json: boolean = false) {
    if (json) {
        console.log(JSON.stringify({
            ...state,
            direction: DIRECTIONS[state.direction]
        }));
    } else {
        console.log(`${DIRECTIONS[state.direction]} ${state.x} ${state.y}`);
    }
}

(async () => {
    const file = getArgValue(INPUT_FILE_ARG);

    if (!file) {
        return;
    }

    printState(await run(file), getArgFlag(INPUT_OUTPUT_FLAG));
})();

export {
    run,
    GRID_SIZE
}
