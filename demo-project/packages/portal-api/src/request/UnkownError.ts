class UnkownError extends Error {
  constructor(status: number, statusText: string) {
    super(`Unkown Error: ${status} ${statusText}`);
  }
}

export default UnkownError;
