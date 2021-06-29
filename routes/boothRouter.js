const router = require("express").Router();
const boothCtrl = require("../controllers/boothCtrl");
const auth = require("../middleware/auth");

// these routes are continue from /event/:eslug/booth
//ADD BOOTH
router.post("/add_booth", auth, boothCtrl.addBooth);

// // //SHOW HOSTING EVENTS, EVENT ARCHIVE
// router.get("/all_events", auth, boothCtrl.viewAllEvents);

// // //SHOW HOSTING EVENTS, EVENT ARCHIVE
// router.get("/user_events", auth, boothCtrl.viewAllUserEvents);

// // SHOW SINGLE EVENT
// router.get("/:eslug", auth, boothCtrl.viewSingleEvent);

// //UPDATE EVENT
// router.patch("/update/:id", auth, eventCtrl.updateEvent);

// // DELETE SINGLE EVENT
// router.delete("/:id", auth, eventCtrl.deleteEvent);

module.exports = router;
