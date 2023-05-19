const catchError = (err: any) => {
  if (
    window.origin.includes("staging") ||
    window.origin.includes("localhost")
  ) {
    console.log(err);
  } else {
    console.log(err);
  }
};

export default catchError;
