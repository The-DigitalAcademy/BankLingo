import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";

import swaggerDocs from "./configuration/swagger/swagger.js";
import user_router from "./routes/UserRoutes/user_routes.js";
import pool from "./configuration/database/database_configuration.js";
import gpt_router from "./routes/GptRoutes/gpt_routes.js";
import search_router from "./routes/SearchRoutes/search_routes.js";

const app = express();
const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send({ message: "Welcome to BankLingo!" });
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
  swaggerDocs(app, PORT);
});

const corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err);
  } else {
    console.log("Successfully connected to the database");
  }
});

//User route
app.use("/api/user", user_router);

//Gpt route
app.use("/api/gpt", gpt_router);
//Store search
app.use("/api/search", search_router);
