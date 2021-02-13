export default class FileNotFoundException extends Error {
    constructor(fName: string) {
        super(`The file "${fName}" does not exists or its not readable`);
    }
}
