import userHandlers from "../../src/msw/handlers/authHandlers";
import { createEntityHandler } from "../../src/msw/handlers/genericHandlers";
import { services } from "../../src/test/mock_data";
import type { ImportMeta } from "../../src/vite-env";

const { VITE_API_URL } = (import.meta  as unknown as ImportMeta).env;


const handlers = [
  ...userHandlers,
  ...createEntityHandler({ url: `${VITE_API_URL}/services`, data: services, entity: "services" }),
];


export default handlers;