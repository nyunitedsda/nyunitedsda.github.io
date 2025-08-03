import { createEntityHandler } from "./apiRequest";
import services from "../../src/test/mock_data/services";
import type { ImportMeta } from "../../src/vite-env";
import userHandlers from "./userApiRequest";

const { VITE_API_URL } = (import.meta  as unknown as ImportMeta).env;


const handlers = [
  ...userHandlers,
  ...createEntityHandler({ url: `${VITE_API_URL}/services`, data: services, entity: "services" }),
];


export default handlers;