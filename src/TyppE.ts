import { ArgsParser }                      from './ArgsParser';
import { CommandHandler, ICommandListMap } from './CommandHandler';
import { DIRECTIONS, ITypeEState }         from './ITypeEState';

export default class TyppE {
    public static readonly GRID_SIZE = {
        x: 99,
        y: 99,
    };
    private static readonly FILE_ARG = 'input';
    private static readonly JSON_FLAG = 'json';
    private static instance: TyppE;
    private static jsonOutput: boolean;
    private state: ITypeEState = {
        x: 0,
        y: 0,
        direction: DIRECTIONS.NORTH
    };

    public static getInstance(): TyppE {
        if (!TyppE.instance) {
            TyppE.instance = new TyppE();
        }

        return TyppE.instance;
    }

    private static getOutputType(): void {
        TyppE.jsonOutput = ArgsParser
            .getInstance()
            .getArgFlag(TyppE.JSON_FLAG);
    }

    public resetState() {
        this.state = {
            x: 0,
            y: 0,
            direction: DIRECTIONS.NORTH
        };
    }

    public async run(file: string): Promise<void> {
        const cmdHandler = CommandHandler.getInstance();
        (await cmdHandler
            .parseCommandsFromFile(file))
            .forEach((cmd: ICommandListMap) => {
                cmdHandler
                    .execCommand(cmd.commandID, cmd.repeat);
            });
    }

    public async autoRun(): Promise<boolean> {
        TyppE.getOutputType();

        const file = ArgsParser
            .getInstance()
            .getArgValue(TyppE.FILE_ARG);

        if (!file) {
            return false;
        }

        await this.run(file);

        return true;
    }

    public getState(): ITypeEState {
        return this.state;
    }

    public printState() {
        if (TyppE.jsonOutput) {
            console.log(JSON.stringify({
                ...this.state,
                direction: DIRECTIONS[this.state.direction]
            }));
        } else {
            console.log(`${DIRECTIONS[this.state.direction]} ${this.state.x} ${this.state.y}`);
        }
    }
}

const typeE = TyppE.getInstance();

typeE
    .autoRun()
    .then((fileFound) => {
        if (fileFound) {
            typeE.printState();
        }
    });
