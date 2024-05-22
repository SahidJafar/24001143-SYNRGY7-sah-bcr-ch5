const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from 'express'
const { JWT_SECRET_KEY } = process.env;

declare module 'express' {
  interface Request {
    user?: {
      id: number;
      user_type: string;
    };
  }
}

// Auth Token
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.sendStatus(401);
    }

    const data = jwt.verify(authorization.split(' ')[1], JWT_SECRET_KEY);

    req.user = {
      id: data.id,
      user_type: data.user_type,
    };
    next();
  } catch (error) {
    throw error;
  }
}

// Check Jika Admin
export const is_admin = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (user && user.user_type !== 'admin') {
      return res.sendStatus(403);
    }
    next();
}
