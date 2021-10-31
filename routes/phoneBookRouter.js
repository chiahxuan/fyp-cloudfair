const router = require("express").Router();
const phoneBookCtrl = require("../controllers/phoneBookCtrl");
const auth = require("../middleware/auth");

router.post("/add_contact", phoneBookCtrl.addContact);
router.get("/view_all_contact", auth, phoneBookCtrl.viewAllContact);

module.exports = router;
