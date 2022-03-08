require('dotenv').config()
const { existsSync } = require( "fs");

const isDocker = existsSync("/.dockerenv");

const password = process.env.DB_PASSWORD;
const devPassword = process.env.DEV_DB_PASSWORD;

console.log({isDocker})

const options = [
  {
    name: "default", //dev
    type: "postgres",
    host: isDocker ? "arcabouco-dev-database" : "localhost",
    port: 5432,
    username: "arcabouco",
    password: devPassword,
    database: "arcabouco",
    entities: ["src/database/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    logNotifications: true,
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
  {
    name: "test-dev",
    type: "postgres",
    host: isDocker ? "arcabouco-dev-database" : "localhost",
    port: 5432,
    username: "arcabouco",
    password: devPassword,
    database: "test",
    entities: ["src/database/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    logNotifications: true,
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
  {
    name: "prod",
    type: "postgres",
    host: "arcabouco-database",
    port: isDocker ? 5432 : 5431,
    username: "arcabouco",
    password,
    database: "arcabouco",
    entities: ["dist/database/entities/**/*.js"],
    migrations: ["dist/database/migrations/*.js"],
    logNotifications: true,
    cli: {
      migrationsDir: "dist/database/migrations",
    },
  },
  {
    name: "test-prod",
    type: "postgres",
    host: isDocker ? "arcabouco-dev-database" : "localhost",
    port: 5432,
    username: "arcabouco",
    password: devPassword,
    database: "test",
    entities: ["src/database/entities/**/*.ts"],
    migrations: ["src/database/migrations/*.ts"],
    logNotifications: true,
    cli: {
      migrationsDir: "src/database/migrations",
    },
  },
];

module.exports = options;
