const router = require("express").Router();
const orgCtrl = require("../controllers/orgCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/new", orgCtrl.createOrg);
router.get("/overview", auth, orgCtrl.viewOrg);
router.patch("/edit_organization", auth, orgCtrl.editOrg);
router.delete("/delete_organization", auth, orgCtrl.deleteOrg);

module.exports = router;
