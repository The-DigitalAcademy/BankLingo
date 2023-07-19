import createUser from "../controllers/user_controller.js";
import express from "express";
const user_router = express.Router();

user_router.post("/", createUser);


export default user_router;