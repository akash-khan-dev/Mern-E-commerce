const router = require("express").Router();
const apiRoute = require("./api/auth");

const api = process.env.BASE_URL;

router.use(api, apiRoute);
// if note route includes
router.use(api, (req, res) => {
  res.send("no api route found");
});
module.exports = router;
