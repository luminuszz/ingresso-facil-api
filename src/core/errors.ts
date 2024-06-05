export class ResourceNotFoundException extends Error {
  constructor(message: string) {
    super(`Resource not found: ${message}`);
    this.name = 'ResourceNotFoundException';
  }
}

export class InvalidPermissionException extends Error {
  constructor() {
    super('Invalid permission');
    this.name = 'InvalidPermissionExecption';
  }
}
