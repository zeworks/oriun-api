export class UserInvalidError extends Error {
  constructor() {
    super("User Invalid")
    this.name = "UserInvaliError";
    this.message = "User Invalid"
  }
}
