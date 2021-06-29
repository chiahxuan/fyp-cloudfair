const Users = require("../models/userModel");
const Organization = require("../models/Organization");
const Event = require("../models/Event");

const eventCtrl = {
    //ADD EVENT
    addEvent: async (req, res) => {
        try {
            const { ename, eslug, description, startDate, endDate, userId, organizationId } = req.body;

            //VALIDATE ALL FIELD INSERTED
            if (!ename || !eslug || !description || !startDate || !endDate || !organizationId || !userId) return res.status(400).json({ msg: "Please fill in all fields." });
            //VALIDATE STING VALUES
            if (ename.length > 300 || ename.length < 2) return res.status(400).json({ msg: "Input should not less than 2 characters, and more than 300 characters." });
            if (eslug.length > 50 || eslug.length < 5) return res.status(400).json({ msg: "Input should not less than 5 characters, and more than 50 characters." });
            if (description.length > 2000 || description.length < 5)
                return res.status(400).json({ msg: "Input should not less than 5 characters, and more than 2000 characters." });
            let addEvent = new Event({
                ename: ename,
                eslug: eslug,
                description: description,
                startDate: startDate,
                endDate: endDate,
                user: userId,
                organization: organizationId,
            });
            await addEvent.save();
            res.json;
            res.json({ msg: "Event has been created " });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //SHOW HOSTING EVENTS, EVENT ARCHIVE
    viewAllEvents: async (req, res) => {
        try {
            //EDIT LATER
            const user = await Users.findById(req.user.id).select("-password");
            const organization = await Organization.find({ organizationCreatorId: user._id });

            //search events by organizationId
            // const event = await Event.find({ organization: organization[0]._id});

            //search events by userId
            const event = await Event.find({ user: user._id });
            res.json(event);

            // res.json({ msg: "Returned Message" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //SHOW HOSTING EVENTS, EVENT ARCHIVE
    viewAllUserEvents: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            const organization = await Organization.find({ organizationCreatorId: user._id });

            //search events by organizationId
            // const event = await Event.find({ organization: organization[0]._id});

            //search events by userId
            const event = await Event.find({ user: user._id });
            res.json(event);

            // res.json({ msg: "Returned Message" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // SHOW SINGLE EVENT
    viewSingleEvent: async (req, res) => {
        console.log(req.params.eslug);
        try {
            const event = await Event.find({ eslug: req.params.eslug });
            res.json(event);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //UPDATE EVENT
    updateEvent: async (req, res) => {
        try {
            res.json({ msg: "Returned updateEvent" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // DELETE SINGLE EVENT
    deleteEvent: async (req, res) => {
        try {
            res.json({ msg: "Returned deleteEvent" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = eventCtrl;
