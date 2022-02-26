import { Request } from 'express';

export declare global {
  namespace Express {
    interface User {
      uid: string;
    }
  }
}

export declare module 'express' {
  export type AuthenticatedRequest = Express.AuthenticatedRequest & Request;
}
