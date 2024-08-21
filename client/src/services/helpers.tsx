export const fetchData = async (url, method, payload = {}) => {
  try {
    const token = window.localStorage.getItem("token");

    if (token) {
      payload.token = token;
    }

    const params = {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
        Authorisation: `Bearer ${token}`,
      }),
      token: token,
    };

    if (method !== "GET") {
      params.body = JSON.stringify(payload);
    }

    const res = await fetch(url, params);

    return res;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};
