import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config.js";
import client from "../configuration/database_configuration.js";
import secret from "../configuration/jwt_secret.js";
import transporter from "../configuration/email_configurations.js";
import { request } from "express";

async function emailExists(email) {
  try {
    const emailQuery = {
      text: "SELECT * FROM users WHERE email = $1",
      values: [email],
    };
    const emailResult = await client.query(emailQuery);
    if (emailResult && emailResult.rows.length > 0) {
      return emailResult.rows[0];
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    throw error;
  }
}

export async function createUserService(request, response) {
  const {
    name,
    surname,
    email,
    age,
    password,
    profile_picture,
    contact_number,
    created_date,
    updated_date,
  } = request.body;
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
      values: [
        name,
        surname,
        email,
        age,
        hashedPassword,
        profile_picture,
        contact_number,
        created_date,
        updated_date,
      ],
    };

    const results = await client.query(insertQuery);
    return response.status(201).json(results.rows);
  } catch (error) {
    console.error("Error saving user to the database:", error);
    throw error;
  }
}

export async function signInUserService(request, response) {
  try {
    const email = request.body.email;
    const password = request.body.password;
    const insertQuery = {
      text: "SELECT * FROM users WHERE email = $1 ",
      values: [email],
    };
    const results = await client.query(insertQuery);

    const userPassword = results.rows[0].password;
    let isPasswordValid = bcrypt.compareSync(password, userPassword);

    if (isPasswordValid) {
      let token = jwt.sign({ id: results.rows[0].user_id }, secret, {
        expiresIn: 86400,
      });
      let successObject = {
        email: email,
        name: results.rows[0].name,
        surname: results.rows[0].surname,
        userId: results.rows[0].user_id,
        age: results.rows[0].age,
        token: token,
      };
      return response.status(200).json(successObject);
    } else {
      return response
        .status(400)
        .json({ message: "Credentials are not correct" });
    }
  } catch (error) {
    console.error("Error in signInUserService:", error);
    return response.status(409).json({ message: "Failure response" });
  }
}

export async function passwordResetOTPService(request, response) {
  const { email } = request.body;
  try {
    const exists = await emailExists(email);
    if (!exists) {
      return response.status(409).json({ message: "User does not exist" });
    }
    let number = Math.floor(1000 + Math.random() * 9000);
    const mailConfigurations = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Forgot Password OTP",
      // This would be the text of email body
      html:
        "<h1>Your Password Reset OTP:</h1><br/>" +
        email +
        `<p>Your password reset OTP is : <strong>${number}</strong><br/><br/>
                       Made with ❤️ By BankLingo.</p>`,
    };
    // Send the mail upon everything above correct
    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) throw Error(error);
      console.log(info);
    });
    let successObject = {
      email: exists.email,
      number: number,
      user: exists.user_id,
    };
    return response.status(200).json(successObject);
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
}

export async function updateUserPasswordService(request, response) {
  const user_id = parseInt(request.params.id);
  const { email, password } = request.body;

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  if (isNaN(user_id)) {
    return response.status(400).json({ message: "Invalid user ID" });
  }
  try {
    const insertQuery = {
      text: "UPDATE users SET  email = $1, password = $2 WHERE user_id = $3",
      values: [email, hashedPassword, user_id],
    };
    const results = await client.query(insertQuery);
    return response.status(200).json({message : `Passsword for User with id : ${user_id} has been succesfully Updated`});
  } catch (error) {
    console.error("Error sending OTP", error);
    throw error;
  }
}

export default {
  createUserService,
  signInUserService,
  passwordResetOTPService,
  updateUserPasswordService
};

// Check if user is there and return the data
