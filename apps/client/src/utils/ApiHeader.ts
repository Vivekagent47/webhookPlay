const headers = () => {
  // let accID;
  // if (localStorage.getItem("account") !== "undefined") {
  //   accID = JSON.parse(localStorage.getItem("account"))?.id || "";
  // }
  // const userID = JSON.parse(localStorage.getItem("user"))?.id;

  return {
    "Content-Type": "application/json",
    // "X-Console-Account": accID,
    // "X-Console-User": userID,
    Accept: "*/*",
  };
};

export default headers;
