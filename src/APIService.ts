const apiUrl: string | undefined = process.env.REACT_APP_API_URL;

export class APIService {
  static async loginRequest(name: string, password: string) {
    console.log(apiUrl, "api url");
    console.log(localStorage.getItem("accessToken"));
    return await request(
      `${apiUrl}/auth/login`,
      "POST",
      {},
      { name, password }
    );
  }

  static async getProfile() {
    return await reqAuth(`${apiUrl}/auth/profile`, "GET");
  }
  static async getCustomers() {
    return await reqAuth(`${apiUrl}/customers`, "GET");
  }

  static async getAllListTasks() {
    return await reqAuth(`${apiUrl}/lists`, "GET");
  }
}

export async function request(
  url: string,
  method: string = "GET",
  headers: any = {},
  body: any = null,
  credentials?: RequestCredentials
) {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const requestOptions: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
    body: method !== "GET" ? JSON.stringify(body) : null,
    credentials,
  };

  const response = await fetch(url, requestOptions);

  if (!response.ok) {
    const errorMessage = `Network response was not ok (${response.status} ${response.statusText})`;
    throw new Error(errorMessage);
  }

  return response.json();
}
export async function reqAuth(
  url: string,
  method: string,
  headers: any = {},
  body: any = null
) {
  const allHeaders = {
    "Content-Type": "application/json",
    ...headers,
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  };
  return await request(url, method, allHeaders, body);
}
