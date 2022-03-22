module.exports.formatData = (data) => {
  if (data) {
    return { data };
  } else {
    throw new Error("No Data");
  }
};
