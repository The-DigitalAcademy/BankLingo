import bcrypt from "bcrypt";
import client from "../configuration/database_configuration.js";
import "dotenv/config.js";

async function emailExists(email) {
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

async function createUserService(request, response) {
    const { name, surname, email, age, password, profile_picture, contact_number, created_date, updated_date } = request.body;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    try {
        const exists = await emailExists(email);
        if (exists) {
            return response.status(409).json({ message: "User already exists" });
        }

        const insertQuery = {
            text: "INSERT INTO users (name, surname, email, age, password, profile_picture, contact_number, created_date, updated_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            values: [name, surname, email, age, hashedPassword, profile_picture, contact_number, created_date, updated_date],
        };

        const results = await client.query(insertQuery);
        return response.status(201).json(results.rows);
    } catch (error) {
        console.error("Error saving user to the database:", error);
        throw error;
    }
}

export default createUserService;
