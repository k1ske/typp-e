import * as fs               from 'fs';
import FileNotFoundException from './Exceptions/FileNotFoundException';

export class FileReader {
    private static instance: FileReader;

    public static getInstance(): FileReader {
        if (!FileReader.instance) {
            FileReader.instance = new FileReader();
        }

        return FileReader.instance;
    }

    public readChars(file: string, cb: (char: string) => void, done: () => void) {
        const stream = fs.createReadStream(file, {
            encoding: 'utf8',
        });

        stream.on('error', (e: StreamException) => {
            if (e.code === 'ENOENT') {
                throw new FileNotFoundException(file);
            }
        });

        stream.on('readable', () => {
            let char: string;

            while ((char = stream.read(1)) !== null) {
                cb(char);
            }

            stream.close();

            done();
        });
    }
}

interface StreamException extends Error {
    code: string
}
