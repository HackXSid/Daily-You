const { app } = require("./app");
const { assertDatabaseConnectionOk } = require("./models/validateDB");

const dotenvfile =
  process.env.NODE_ENV === "production" ? ".env.production" : ".env";
require("dotenv").config({ path: dotenvfile });

const PORT = process.env.PORT || 8000;

assertDatabaseConnectionOk();

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Daily You Server listening on Port ${PORT}`)
);
