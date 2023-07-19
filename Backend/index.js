import express from "express";
import "dotenv/config";
import swaggerDocs from './swagger.js'

const app = express();
const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send({ message: "Welcome to BankLingo!" });
});
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
  swaggerDocs(app, PORT)
});
