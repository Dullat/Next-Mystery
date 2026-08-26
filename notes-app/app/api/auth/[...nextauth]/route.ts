import { handlers } from "@/auth"; // Imports from the auth.ts file we just made

// This exposes the GET and POST endpoints that Auth.js uses internally
export const { GET, POST } = handlers;
