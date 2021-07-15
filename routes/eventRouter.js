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

// //SHOW PAST EVENTS, EVENT ARCHIVE
router.get("/past", auth, eventCtrl.viewPastEvents);

// //SHOW UPCOMING EVENTS, EVENT ARCHIVE
router.get("/upcoming", auth, eventCtrl.viewUpcomingEvents);

// //SHOW UPCOMING EVENTS, EVENT ARCHIVE
router.get("/hosting", auth, eventCtrl.viewHostingEvents);

// SHOW SINGLE EVENT
router.get("/:eslug", auth, eventCtrl.viewSingleEvent);

//Edit EVENT
router.patch("/:eslug/edit_event", auth, eventCtrl.editEvent);

// DELETE SINGLE EVENT
router.delete("/:eslug/delete_event", auth, eventCtrl.deleteEvent);

// //SHOW UPCOMING EVENTS, EVENT ARCHIVE
// router.get("/upcoming_events", auth, eventCtrl.findUpcomingEvents);

module.exports = router;
