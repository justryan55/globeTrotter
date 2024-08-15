export const fetchData = async (url, method, payload) => {
  try {
    const params = {
      method: method,
      headers: new Headers({
        "Content-Type": "application/json",
      }),
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
