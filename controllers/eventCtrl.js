const Users = require("../models/userModel");
const Organization = require("../models/Organization");
const Event = require("../models/Event");
const Booth = require("../models/Booth");

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
    //SHOW ALL EVENTS
    viewAllEvents: async (req, res) => {
        try {
            const event = await Event.find();
            res.json(event);
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
        // console.log(req.params.eslug);
        try {
            const event = await Event.find({ eslug: req.params.eslug });
            res.json(event);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //Edit EVENT
    editEvent: async (req, res) => {
        const { eslug } = req.params;
        try {
            const event = await Event.findOne({ eslug: eslug });
            // console.log(event);
            const { ename, eBackground, startDate, endDate, description } = req.body;

            await Event.findOneAndUpdate(
                { _id: event._id },
                {
                    ename: ename,
                    eBackground: eBackground,
                    description: description,
                    startDate: startDate,
                    endDate: endDate,
                }
            );
            res.json({ msg: "Update Event Success" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    // DELETE SINGLE EVENT
    deleteEvent: async (req, res) => {
        const { eslug } = req.params;
        // console.log(eslug);
        try {
            const event = await Event.findOne({ eslug: eslug });

            //remove all booths that matches the event
            await Booth.deleteMany({ event: event._id });

            //remove the event
            await Event.findByIdAndDelete(event._id);

            res.json({ msg: "Delete Event Success" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = eventCtrl;
