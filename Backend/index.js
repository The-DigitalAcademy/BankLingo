import express from "express";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT;

app.get("/", (request, response) => {
  response.send({ message: "Welcome to BankLingo!" });
});
app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
