const notFound = (req, res) =>
  res.status(404).send({ msg: "Api route does not exist" });

module.exports = notFound;
