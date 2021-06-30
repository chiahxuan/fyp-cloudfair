const router = require("express").Router();
const boothCtrl = require("../controllers/boothCtrl");
const auth = require("../middleware/auth");

// these routes are continue from /event/:eslug/booth
//ADD BOOTH
router.post("/:eslug/booth/add_booth", auth, boothCtrl.addBooth);

//ADD BOOTH
router.get("/:eslug/booth/all", auth, boothCtrl.viewBooth);

module.exports = router;
