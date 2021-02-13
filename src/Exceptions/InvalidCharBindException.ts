export default class InvalidCharBindException extends Error {
    constructor(charBind: string) {
        super(`Invalid char bind (${charBind})`);
    }
}
