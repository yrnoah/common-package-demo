class GeneralError {
  private _status: number;
  private _error: string;
  private _message: string;

  constructor(status: number, error: string, message: string) {
    this._status = status;
    this._error = error;
    this._message = message;
  }

  get status() {
    return this._status;
  }

  get error() {
    return this._error;
  }

  get message() {
    return this._message;
  }
}

export default GeneralError;
