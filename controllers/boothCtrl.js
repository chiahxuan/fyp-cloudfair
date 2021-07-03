const Users = require("../models/userModel");
const Organization = require("../models/Organization");
const Event = require("../models/Event");
const Booth = require("../models/Booth");

const boothCtrl = {
    //ADD BOOTH
    addBooth: async (req, res) => {
        try {
            const { bname, bslug, description, bvideo, user, organization, event } = req.body;
            // console.log(req.headers);
            //VALIDATE ALL FIELD INSERTED
            if (!bname || !bslug || !description || !bvideo || !user || !organization || !event) return res.status(400).json({ msg: "Please fill in all fields." });

            // //VALIDATE STING VALUES
            if (bname.length > 300 || bname.length < 2) return res.status(400).json({ msg: "Input should not less than 2 characters, and more than 300 characters." });
            if (bslug.length > 50 || bslug.length < 5) return res.status(400).json({ msg: "Input should not less than 5 characters, and more than 50 characters." });
            if (description.length > 2000 || description.length < 5)
                return res.status(400).json({ msg: "Input should not less than 5 characters, and more than 2000 characters." });

            let addBooth = new Booth({
                bname: bname,
                bslug: bslug,
                description: description,
                bvideo: bvideo,
                user: user,
                organization: organization,
                event: event,
            });
            await addBooth.save();
            res.json({ msg: "Booth has been created " });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //SHOW HOSTING EVENTS, EVENT ARCHIVE
    viewBooth: async (req, res) => {
        // console.log(req.body);
        try {
            //search events by organizationId
            const event = await Event.find({ eslug: req.params.eslug });
            // //search booth by eventID
            const booth = await Booth.find({ event: event[0]._id });
            res.json(booth);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // SHOW SINGLE BOOTH
    viewSingleBooth: async (req, res) => {
        // console.log(req.params.bslug);
        try {
            const booth = await Booth.findOne({ bslug: req.params.bslug });
            res.json(booth);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //SHOW HOSTING BOOTH, EVENT ARCHIVE
    viewAllUserBooth: async (req, res) => {
        try {
            res.json({ msg: "Returned viewAllUserBooth" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    //edit  BOOTH
    editBooth: async (req, res) => {
        // console.log(req.params);
        const { bslug, eslug } = req.params;
        // console.log(req.body);
        // console.log("success to controller");
        // console.log(req.body.bimage);

        try {
            const event = await Event.findOne({ eslug: eslug });
            const booth = await Booth.findOne({ bslug: bslug });
            // console.log(event);
            // console.log(booth);
            const { bname, bUpdatedslug, description, bimage, bvideo, user, organizationId } = req.body;

            await Booth.findOneAndUpdate(
                { _id: booth._id },
                {
                    bname: bname,
                    bslug: bslug,
                    bimage: bimage,
                    description: description,
                    bvideo: bvideo,
                }
            );

            res.json({ msg: "Update booth success" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // DELETE SINGLE BOOTH
    deleteBooth: async (req, res) => {
        try {
            res.json({ msg: "Returned deleteBooth" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

module.exports = boothCtrl;
