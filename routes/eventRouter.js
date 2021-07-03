const router = require("express").Router();
const eventCtrl = require("../controllers/eventCtrl");
const auth = require("../middleware/auth");

// these routes are continue from /event...
//ADD EVENT
router.post("/add_event", eventCtrl.addEvent);

// //SHOW ALL EVENTS, EVENT ARCHIVE
router.get("/all_events", auth, eventCtrl.viewAllEvents);

// //SHOW USER EVENTS, EVENT ARCHIVE
router.get("/user_events", auth, eventCtrl.viewAllUserEvents);

// SHOW SINGLE EVENT
router.get("/:eslug", auth, eventCtrl.viewSingleEvent);

//Edit EVENT
router.patch("/:eslug/edit_event", auth, eventCtrl.editEvent);

// // DELETE SINGLE EVENT
// router.delete("/:id", auth, eventCtrl.deleteEvent);

module.exports = router;
