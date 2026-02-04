export enum Status {
    SUCCESS = "success",
    ERROR = "error"
}

export class Meta {
    public lang: string = "en";

    [k: string]: any;
}

export interface ServerResultResponse<T extends any> {
    status: Status;
    message: string;
    data: T;
    meta: Meta;
}

export class ServerResult<T extends any> {
    private _status: Status;
    private _message: string;
    private _data: T;
    private _meta: Meta;

    constructor(message: string = "An unexpected Error occurred", data: T | any = {}, status: Status = Status.ERROR, meta?: Meta) {
        this._status = status;
        this._message = message;
        this._data = data;
        this._meta = meta || new Meta()
    }

    get message() {
        return this._message;
    }

    get status() {
        return this._status;
    }

    get meta(): Meta {
        return this._meta;
    }

    get data() {
        return this._meta;
    }

    set data(data: any) {
        this._data = data;
    }

    success(message: string) {
        this._status = Status.SUCCESS;
        this._message = message;

        return this.toString();
    }

    error(message: string) {
        this._status = Status.ERROR;
        this._message = message;

        return this.toString();
    }

    toString(): string {
        return JSON.stringify({
            status: this._status,
            message: this._message,
            data: this._data,
            meta: this._meta,
        });
    }
}