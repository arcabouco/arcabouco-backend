require("dotenv").config();

const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

const devPassword = process.env.DEV_DB_PASSWORD;
const devDatabase = process.env.DEV_DB_DATABASE;

module.exports = [
  {
    name: "dev",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "arcabouco",
    password: devPassword,
    database: devDatabase,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
  {
    name: "prod",
    type: "postgres",
    host: "arcabouco-database",
    port: 5431,
    username: "arcabouco",
    password,
    database,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
];
