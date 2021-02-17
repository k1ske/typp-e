import { exec } from 'child_process';
import { promisify } from 'util';

const tsExec = 'node_modules/.bin/ts-node';
const epFile = 'src/app.ts';
const inputArg = 'input';
const baseCmd = `${tsExec} ${epFile} --json --${inputArg}=test/input-test-cases/`;

describe('Command Line', () => {
    let execSync: (arg1: string) => Promise<any>;

    beforeAll(() => {
        execSync = promisify<string, any>(exec);
    });

    test('Example from test from email', async () => {
        expect(JSON.parse((await execSync(`${baseCmd}exampleTest.txt`)).stdout))
            .toEqual({x: 4, y: 99, direction: 'SOUTH'});
    });
});
