export class ResourceNotFoundException extends Error {
  constructor(message: string) {
    super(`Resource not found: ${message}`);
    this.name = 'ResourceNotFoundException';
  }
}
