export const fetchData = async (url, method, payload) => {
  try {
    //add token to local storage. Check if token exists
    // if token, set payload.token = to the token

    const token = window.localStorage.getItem("token");

    if (token) {
      payload.token = token;
    }

    const params = {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
      token: token,
      body: JSON.stringify(payload),
    };

    const res = await fetch(url, params);
    // if (res.status !== 200) {
    //   return [];
    // }

    // const data = await res.json();

    return res;
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};
