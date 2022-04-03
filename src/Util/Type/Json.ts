export type JsonValue = string | number | boolean | null | Json;

export type Json = { [key: string]: JsonValue } | JsonValue[];
