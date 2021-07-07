const router = require("express").Router();
const boothCtrl = require("../controllers/boothCtrl");
const auth = require("../middleware/auth");

// these routes are continue from /event/:eslug/booth
//ADD BOOTH
router.post("/:eslug/booth/add_booth", auth, boothCtrl.addBooth);

//VIEW ALL BOOTH
router.get("/:eslug/booth/all", auth, boothCtrl.viewBooth);

//VIEW SINGLE BOOTH
router.get("/:eslug/booth/:bslug", auth, boothCtrl.viewSingleBooth);

//EDIT BOOTH
router.patch("/:eslug/booth/:bslug/edit_booth", auth, boothCtrl.editBooth);

//DELETE BOOTH
router.delete("/:eslug/booth/:bslug/delete_booth", auth, boothCtrl.deleteBooth);

//STREAMING
router.get("/:eslug/booth/:bslug/createRoom", auth, boothCtrl.createRoom);
router.get("/:eslug/booth/:bslug/streaming_room/:room", auth, boothCtrl.streamingRoom);

module.exports = router;
