const router = require("express").Router();
const eventCtrl = require("../controllers/eventCtrl");
const auth = require("../middleware/auth");

// these routes are continue from /event...
//ADD EVENT
router.post("/add_event", eventCtrl.addEvent);

// //SHOW HOSTING EVENTS, EVENT ARCHIVE
router.get("/all_events", auth, eventCtrl.viewAllEvents);

// //SHOW HOSTING EVENTS, EVENT ARCHIVE
router.get("/user_events", auth, eventCtrl.viewAllUserEvents);

// // SHOW SINGLE EVENT
// router.get("/:id", auth, eventCtrl.viewSingleEvent);

// //UPDATE EVENT
// router.patch("/update/:id", auth, eventCtrl.updateEvent);

// // DELETE SINGLE EVENT
// router.delete("/:id", auth, eventCtrl.deleteEvent);

module.exports = router;
