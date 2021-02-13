import { join }                 from 'path';
import * as fs                  from 'fs';
import InvalidCharBindException from './Exceptions/InvalidCharBindException';
import { ICommand }             from './Commands/ICommand';
import { FileReader }           from './FileReader';

export class CommandHandler {
    private static readonly COMMANDS_PATH = 'Commands';
    private static instance: CommandHandler;
    private commandMap: ICommandMap[] = [];
    private commandIDCount: number = 0;

    private constructor() {
        this.loadCommands();
    }

    public static getInstance(): CommandHandler {
        if (!CommandHandler.instance) {
            CommandHandler.instance = new CommandHandler();
        }

        return CommandHandler.instance;
    }

    public addCommand(bindChar: string, handler: ICommand): void {
        if (bindChar.length > 1 && !bindChar.match(/[a-z]/i)) {
            throw new InvalidCharBindException(bindChar);
        }

        this.commandMap[this.commandIDCount++] = {
            bindChar,
            handler
        };
    }

    public parseCommandsFromFile(file: string): Promise<ICommandListMap[]> {
        return new Promise((resolve) => {
            const commandIDList: ICommandListMap[] = [];
            let commandID: number | null;
            let repeatsBuffer: string = '';

            FileReader
                .getInstance()
                .readChars(file, (chunk: string) => {
                    if (chunk.match(/\d/)) {
                        repeatsBuffer += chunk;

                        return;
                    }

                    if (repeatsBuffer) {
                        if (commandIDList.length) {
                            commandIDList[commandIDList.length - 1].repeat = parseInt(repeatsBuffer);
                        }

                        repeatsBuffer = '';
                    }

                    commandID = this.keyBindToId(chunk.toUpperCase());

                    if (commandID !== null) {
                        commandIDList.push({
                            commandID,
                            repeat: 1
                        });
                    }
                }, () => resolve(commandIDList));
        });
    }

    public keyBindToId(keyBind: string): number | null {
        for (const commandIDKey in this.commandMap) {
            if (!this.commandMap.hasOwnProperty(commandIDKey)) {
                continue;
            }

            const commandID = parseInt(commandIDKey);

            if (this.commandMap[<number>commandID].bindChar === keyBind) {
                return <number>commandID;
            }
        }

        return null;
    }

    public execCommand(keyBind: number, repeats: number) {
        if (keyBind < 0 || keyBind >= this.commandMap.length) {
            return;
        }

        this.commandMap[keyBind].handler.trigger(repeats);
    }

    private loadCommands(): void {
        const normalizedPath: string = join(__dirname, CommandHandler.COMMANDS_PATH);

        fs
            .readdirSync(normalizedPath)
            .forEach((file: string) => {
                const filePath = `${normalizedPath}/${file}`;
                import(filePath);
            });
    }
}

interface ICommandMap {
    bindChar: string,
    handler: ICommand
}

export interface ICommandListMap {
    commandID: number,
    repeat: number
}
