export abstract class UseCaseImpl<Request = unknown, Response = void> {
  abstract execute(request: Request): Promise<Response>;
}
