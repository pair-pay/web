export class InvalidUserException extends Error {
  constructor(message: string) {
    super(message);
  }
}
