require("dotenv").config();

const password = process.env.DB_PASSWORD;

const options = [
  {
    name: "default",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "arcabouco",
    password: "arcabouco",
    database: "arcabouco",
    entities: ["src/Database/entities/**/*.ts"],
    migrations: ["src/Database/migrations/*.ts"],
    logNotifications: true,
    cli: {
      migrationsDir: "src/Database/migrations",
    },
  },
  {
    name: "prod",
    type: "postgres",
    host: "db.arcabouco.org",
    port: 5432,
    username: "arcabouco",
    password,
    database: "arcabouco",
    entities: ["dist/Database/entities/**/*.js"],
    migrations: ["dist/Database/migrations/*.js"],
    logNotifications: true,
    cli: {
      migrationsDir: "dist/Database/migrations",
    },
  },
  {
    name: "test",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "arcabouco",
    password: "arcabouco",
    database: "test",
    entities: ["src/Database/entities/**/*.ts"],
    migrations: ["src/Database/migrations/*.ts"],
    logNotifications: true,
    cli: {
      migrationsDir: "src/Database/migrations",
    },
  },
];

module.exports = options;
