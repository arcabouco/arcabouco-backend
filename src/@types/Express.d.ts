declare namespace Express {
  interface Request {
    auth: import('Domain/User/Type').AuthPayload;
  }
}