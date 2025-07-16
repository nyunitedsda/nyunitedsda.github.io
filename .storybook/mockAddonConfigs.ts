import roles from '../src/test/mock_data/roles';
import users from '../src/test/mock_data/users';


type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

interface MockConfig {
  url: string;
  method: HttpMethod;
  status: number;
  response: any;
}

const BASE_URL = (typeof import.meta !== "undefined" && (import.meta as unknown as {env: {VITE_API_URL: string}}).env && (import.meta as unknown as {env: {VITE_API_URL: string}}).env.VITE_API_URL) 
  ? (import.meta as unknown as {env: {VITE_API_URL: string}}).env.VITE_API_URL 
  : "http://localhost:3000";
const getUrl = (path: string) => `${BASE_URL}${path}`;
      

const generateMockResponse = (data: Record<string, any>[]) => {
  return {
    get: data || [],
    put: {
      message: "Updated successfully",
      data: data[0] || {},
    },
    post: {
      message: "Created successfully",
      data: data[0] || {},
    },
    delete: {
      message: "Deleted successfully",
    },
  };
};

/**
 * Generates mock data configs for all HTTP methods for a given entity.
 * @param entity The entity name (e.g., "users")
 * @param baseUrl The base API URL (e.g., "/api/users")
 * @param mockResponse The mock response object to return
 */
export function generateEntityMockData(
  baseUrl: string,
  mockData: Record<string, any>[] = [],
): MockConfig[] {

  const mockResponse = generateMockResponse(mockData);
  return [
    {
      url: ` ${baseUrl}`,
      method: "GET",
      status: 200,
      response: Array.isArray(mockResponse.get) ? mockResponse.get : [mockResponse.get],
    },
    {
      url: `${baseUrl}`,
      method: "POST",
      status: 201,
      response: mockResponse.post,
    },
    {
      url: `${baseUrl}/:id`,
      method: "PUT",
      status: 200,
      response: mockResponse.put,
    },
    {
      url: `${baseUrl}/:id`,
      method: "DELETE",
      status: 204,
      response: mockResponse.delete,
    },
  ];
}



const globalMockConfigs = {
  globalMockData: [
     ...generateEntityMockData(getUrl("/api/auth/users"), users),
     ...generateEntityMockData(getUrl(`/api/roles`), roles)
  ]
};

export default globalMockConfigs;