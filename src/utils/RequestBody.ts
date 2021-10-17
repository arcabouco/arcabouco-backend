import { Request } from "express";

export type RequestBody<B extends Record<string, any>> = Request<{}, {}, B>;
