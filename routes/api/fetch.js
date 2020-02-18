var router = require("express").Router();
var fetchController = require("../../controllers/fetch");
router.get("/", fetchController.scrapedHeadlines);
module.exports = router;