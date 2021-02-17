import { readChars } from './file-reader';
import { move, turnLeft, turnRight } from './actions';
import PositionState from './types/position-state';
import CommandMap from './types/command-map';

const COMMAND_LIST = ['M', 'R', 'L'];
const MAX_REPETITIONS = 100;

type command = (repetitions: number, state: PositionState) => void;
const COMMAND_ACTIONS: command[] = [move, turnRight, turnLeft];

function loadCommandsFromFile(file: string): Promise<CommandMap[]> {
    return new Promise((resolve) => {
        let commands: CommandMap[] = [];
        let repetitionsBuffer = '';

        readChars(file, (char: string, done: boolean) => {
            if (char.match(/\d/)) {
                repetitionsBuffer += char;

                if (done && commands.length) {
                    commands[commands.length - 1].repetitions = Math.min(MAX_REPETITIONS, parseInt(repetitionsBuffer));
                } else {
                    return;
                }
            }

            if (repetitionsBuffer) {
                if (commands.length) {
                    commands[commands.length - 1].repetitions = Math.min(MAX_REPETITIONS, parseInt(repetitionsBuffer));
                }

                repetitionsBuffer = '';
            }

            const commandID = COMMAND_LIST.indexOf(char.toUpperCase());

            if (commandID !== -1) {
                commands.push({
                    commandID: commandID,
                    repetitions: 1
                });
            }

            if (done) {
                resolve(commands);
            }
        });
    });
}

function execCommand(commandID: number, repetitions: number, state: PositionState) {
    if (commandID < 0 || commandID > COMMAND_ACTIONS.length) {
        return;
    }

    COMMAND_ACTIONS[commandID].call(undefined, repetitions, state);
}

export {
    loadCommandsFromFile,
    execCommand
};
