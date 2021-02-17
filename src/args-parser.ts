function getArgValue(key: string): string | null {
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

function getArgFlag(key: string): boolean {
    for (const argBuffer of process.argv) {
        const arg = argBuffer.replace(/=.*/, '');

        if (arg === `--${key}`) {
            return true;
        }
    }

    return false;
}

export {
    getArgValue,
    getArgFlag
};
