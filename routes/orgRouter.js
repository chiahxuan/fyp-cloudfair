const router = require("express").Router();
const orgCtrl = require("../controllers/orgCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router.post("/new", orgCtrl.createOrg);

// router.post("/organization/events/overview", organizationCtrl.create);
// router.post("/organization/events/new", organizationCtrl.create);
// router.post("/organization/events/attendees", organizationCtrl.create);
// router.post("/organization/events/profiles", organizationCtrl.create);
// router.post("/organization/events/team", organizationCtrl.create);

// router.post("/new",  organizationCtrl.createOrganization);
// router.post("/events/overview", organizationCtrl.create);
// router.post("/events/new", organizationCtrl.create);
// router.post("/events/attendees", organizationCtrl.create);
// router.post("/events/profiles", organizationCtrl.create);
// router.post("/events/team", organizationCtrl.create);

// // ORGANIZATION AS EVENT HOST / BOOTH
// router.post("/events/:name", organizationCtrl.create);
// router.post("/events/:name/dashboard", organizationCtrl.create);
// router.post("/events/:name/basic", organizationCtrl.create);
// router.post("/events/:name/registration", organizationCtrl.create);
// router.post("/events/:name/tickets", organizationCtrl.create);
// router.post("/events/:name/tickets", organizationCtrl.create);

// // ORGANIZATION AS EVENT HOST
// router.post("/events/:name/receptions", organizationCtrl.create);
// router.post("/events/:name/schedules", organizationCtrl.create); // schedule setup
// router.post("/events/:name/stage", organizationCtrl.create);
// router.post("/events/:name/stage", organizationCtrl.create);
// router.post("/events/:name/sessions", organizationCtrl.create);
// router.post("/events/:name/networking", organizationCtrl.create);
// router.post("/events/:name/expo", organizationCtrl.create);
// router.post("/events/:name/venue_controls", organizationCtrl.create);

// // ORGANIZATION AS BOOTH
// router.post("/events/:name/vendor", organizationCtrl.create);
// router.post("/events/:name/vendor/new", organizationCtrl.create);
// router.post("/events/:name/vendor/manage", organizationCtrl.create);
// router.post("/events/:name/reports", organizationCtrl.create);
// router.post("/events/:name/registrations", organizationCtrl.create);
// router.post("/events/:name/connection", organizationCtrl.create);
// router.post("/events/:name/stage-summary", organizationCtrl.create);
// router.post("/events/:name/session-summary", organizationCtrl.create);
// router.post("/events/:name/expo-summary", organizationCtrl.create);

module.exports = router;
