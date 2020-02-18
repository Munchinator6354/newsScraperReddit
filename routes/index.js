var router = require("express").Router();
var apiRoutes = require("./api");
var viewRoutes = require("./views");
//Anytime the user visits a /api route, it will only view the apiRoutes content, etc
// router.use("/api", apiRoutes);
router.use("/", viewRoutes);
router.use("/api", apiRoutes);
module.exports = router;