declare namespace NodeJS {
  export interface ProcessEnv {
    ENV: "dev" | "prod" | "test-dev" | "test-prod";
  }
}
