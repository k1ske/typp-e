import { ICommand }       from '../Commands/ICommand';
import { CommandHandler } from '../CommandHandler';

export const Command = (bindChar: string) => {
    return (target: Function) => {
        const newCommand = <ICommand>Reflect.construct(target, []);

        CommandHandler
            .getInstance()
            .addCommand(bindChar, newCommand);
    };
}
