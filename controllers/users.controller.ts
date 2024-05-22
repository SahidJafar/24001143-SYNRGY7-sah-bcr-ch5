import { Response, Request } from "express";

import { UsersModel } from "../databases/models/users";
import { ResponseHelper } from "../helpers/response.helper";
import { hashPassword } from "../utils/hash.password";
const jwt = require("jsonwebtoken");
import bcrypt from "bcrypt";
const { JWT_SECRET_KEY } = process.env;

export class UsersController extends ResponseHelper {
  register = async (request: Request, response: Response) => {
    try {
    // Check if user already exists
    const existingUser = await UsersModel.query().findOne({ email: request.body.email });
    if (existingUser) {
      return this.error("User with this email already exists", null, 409)(response);
    }
      // Hash password
      const passwordHashed = await hashPassword(request.body.password);

      // Insert user data ke database
      const user = await UsersModel.query().insert({
        ...request.body,
        password: passwordHashed,
      });

      // Mengembalikan response sukses
      return this.success("Data inserted successfully", user, 200)(response);
    } catch (error: Error | any) {
      // Mengembalikan response error
      this.error(error.message, null, 404)(response);
    }
  }
  login = async (req: Request, res: Response) => {
    const { email, password } = req.body
    try {
        const user = await UsersModel.query().findOne({ email })
  
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                const payload = {
                    id: user.id,
                    user_type: user.user_type
                }
  
                const token = await jwt.sign(payload, JWT_SECRET_KEY, {
                    expiresIn: "30d",
                });
                // Hapus password dari objek user sebelum mengembalikan response
                const { password, ...userWithoutPassword } = user;
                
                return this.success("Login successfully", {user:userWithoutPassword,token:token}, 200)(res);

            } else {
                return res.status(400).json({
                    code:400,
                    status: false,
                    message: "Incorrect password!"
                });
            }
        } else {
            return res.status(400).json({
                code:400,
                status: false,
                message: "Email is not registered! Please register first."
            });
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}
}
