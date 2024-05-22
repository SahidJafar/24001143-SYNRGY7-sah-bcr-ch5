import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  return await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err: Error | undefined, hash: string) => {
      if (err != null || err !== undefined) reject(err);
      resolve(hash);
    });
  });
};