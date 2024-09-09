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

    // todo
    // 2024-09-09
    // So in this func you would do something like `fullUrl = `${backendURL}/api/${url}`` or wahtever
    // so you don't need to keep copying `${backendURL}/api` every time you use the fuction. Every time you
    // see youself copying and pasting code, or seeing it repeat itself, thats when you think there must be
    // a better way to do it. 

    const res = await fetch(url, params);

    return res;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};
