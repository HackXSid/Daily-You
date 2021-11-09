const sequelize = require("./index");

const assertDatabaseConnectionOk = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database connected");
    sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = { assertDatabaseConnectionOk };
