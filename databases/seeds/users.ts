import { Knex } from "knex";
import { hashPassword } from "../../utils/hash.password";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Hash passwords
    const adminPassword = await hashPassword("password");
    const userPassword = await hashPassword("password");

    // Inserts seed entries
    await knex("users").insert([
        {
            id: 1,
            user_type: "admin",
            name: "admin",
            phone_number: "08123456789",
            email: "admin@gmail.com",
            password: adminPassword,
          },
          {
            id: 2,
            user_type: "customer",
            name: "user",
            phone_number: "08123456789",
            email: "user@gmail.com",
            password: userPassword,
          },
    ]);
};
