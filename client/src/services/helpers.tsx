type Payload = {
  token?: string;
  [key: string]: string | number | boolean | undefined;
};

export const fetchData = async (
  url: string,
  method: string,
  payload: Payload = {}
) => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      payload.token = token;
    }

    const params = {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }),
      token: token,
      ...(method !== "GET" && { body: JSON.stringify(payload) }),
    };

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(`${backendURL}/api/${url}`, params);

    return res;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};

export const fetchCountriesVisited = async (userId: string) => {
  try {
    const token = window.localStorage.getItem("token");

    const params = {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
      token: token,
    };

    const backendURL = import.meta.env.VITE_BACKEND_URL;

    const res = await fetch(
      `${backendURL}/api/${userId}/getCountriesVisisted`,
      params
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
