import { http, HttpResponse } from "msw";
import userData, { mockLoginResponse } from "../../src/test/mock_data/users";
import { createEntityHandler } from "./apiRequest";

const { VITE_API_URL, VITE_API_AUTH_URL } = (import.meta  as unknown as ImportMeta).env;
const USER_STORY_URL = `${VITE_API_URL || "http://localhost:3000"}${VITE_API_AUTH_URL || "/api/auth"}/users`;



const userHandlers = [
  ...createEntityHandler({ url: USER_STORY_URL, data: userData, entity: "users" }),
    // Mock login handler
  http.post(`${VITE_API_AUTH_URL || "/api/auth"}/login`, async (req) => {
    // You can add credential checks here if needed
    return new HttpResponse({status: 200, body: {...mockLoginResponse}});
  }),
];

export default userHandlers;