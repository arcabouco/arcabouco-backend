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
    host: "db.arcabouco.org",
    port: 5432,
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
    name: "test",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "arcabouco",
    password: "arcabouco",
    database: "test",
    entities: ["dist/database/entities/**/*.ts"],
    migrations: ["dist/database/migrations/*.ts"],
    logNotifications: true,
    cli: {
      migrationsDir: "dist/database/migrations",
    },
  },
];

module.exports = options;
