import bcrypt from "bcrypt";
import client from "../configuration/database_configuration.js";
import "dotenv/config.js";
import { request, response } from "express";

async function EmailExists(email) {
    try {
        const emailQuery = {
            text: "SELECT * FROM users WHERE email = $1",
            values: [email],
        };
        const emailResult = await client.query(emailQuery);
        return emailResult && emailResult.rows.length > 0;
    } catch (error) {
        console.error("Error checking user existence:", error);
        throw error;
    }
}

const createUser = async (request, response) => {
    const { name, surname, email, age, password, profile_picture, contact_number, created_date, updated_date } = request.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    try {
        const exists = await EmailExists(email);
        if (exists) {
            return response.status(409).json({ message: "User already exists" });
        }
        await client.query(
            "INSERT INTO users (name,surname,email,age,password,profile_picture,contact_number,created_date, updated_date) VALUES ($1, $2, $3,$4,$5,$6, $7, $8,$9) RETURNING *",
            [name, surname, email, age, hashedPassword, profile_picture, contact_number, created_date, updated_date],
            (error, results) => {
                if (error) {
                    throw error;
                }
                return response.status(201).json(results.rows);
            }
        );
    } catch (error) {
        console.error("Error saving user to the database:", error);
        throw error;
    }
};
export default createUser;