


export class CustomError extends Error {

  constructor(
    public readonly message: string,
    public readonly statusCode: number = 400
  ) {
    super(message);
  }

}