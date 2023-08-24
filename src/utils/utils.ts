export const getToken = () => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("token");
    return token;
  }
};

export const decodeData = async (data: string) => {
  const response = await fetch("https://sweep.logiclane.tech/decryptData", {
    method: "POST",
    body: JSON.stringify({
      data: data,
      code: "RU5DREFUQQ",
    }),
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${getToken()}`,
    },
  });
  const json = response.json();
  console.log("json", JSON.parse(JSON.stringify(json)));
  return json;
};

export const debounce = (fn, timeout) => {
  let timer: number = null;
  // setLoader(true)
  return (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(fn, timeout, ...args);
  };
};
