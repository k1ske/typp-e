export class ArgsParser {
    private static instance: ArgsParser;

    public static getInstance(): ArgsParser {
        if (!ArgsParser.instance) {
            ArgsParser.instance = new ArgsParser();
        }

        return ArgsParser.instance;
    }

    public getArgValue(key: string): string | null {
        for (const argBuffer of process.argv) {
            if (!argBuffer) {
                continue;
            }

            const [arg, value] = argBuffer.split('=');

            if (arg === `--${key}`) {
                return value;
            }
        }

        return null;
    }

    public getArgFlag(key: string): boolean {
        for (const argBuffer of process.argv) {
            const arg = argBuffer.replace(/=.*/, '');

            if (arg === `--${key}`) {
                return true;
            }
        }

        return false;
    }
}
