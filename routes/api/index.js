var router = require("express").Router();
var fetchRoutes = require("./fetch");
router.use("/fetch", fetchRoutes);
module.exports = router;