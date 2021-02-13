import { ICommand } from './ICommand';
import { Command }  from '../Decorators/Command';
import TyppE        from '../TyppE';

@Command('R')
export class TurnRight implements ICommand {
    public trigger(times: number = 1): void {
        const state = TyppE.getInstance().getState();
        let sanitizedDirection: number = state.direction + times;

        while (sanitizedDirection > 4) {
            sanitizedDirection -= 4;
        }

        state.direction = sanitizedDirection;
    }
}
