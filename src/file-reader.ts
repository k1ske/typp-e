import * as fs from 'fs';

type StreamException = Error & { code: string };

function readChars(file: string, cb: (char: string, done: boolean) => void) {
    const stream = fs.createReadStream(file, {
        encoding: 'utf8',
    });

    stream.on('error', (e: StreamException) => {
        if (e.code === 'ENOENT') {
            throw new Error(`The file "${file}" does not exists or its not readable`);
        }
    });

    stream.on('readable', () => {
        while (stream.readableLength) {
            cb(stream.read(1), !stream.readableLength);
        }

        stream.close();
    });
}

export {
    readChars
};
