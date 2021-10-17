require("dotenv").config();

const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

module.exports = {
  name: "default",
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "arcabouco",
  password,
  database,
  entities: ["src/entities/**/*.ts"],
  migrations: ["src/database/migrations/*.ts"],
  cli: {
    migrationsDir: "src/database/migrations",
  },
};
