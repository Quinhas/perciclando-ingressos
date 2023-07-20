export default class ApplicationException extends Error {
  message: string;

  constructor(message: string) {
    super();
    this.message = message;
  }
}
