const Users = require("../models/userModel");
const Organization = require("../models/Organization");
const Event = require("../models/Event");
const Booth = require("../models/Booth");
const { v4: uuidV4 } = require("uuid");

const boothCtrl = {
    //ADD BOOTH
    addBooth: async (req, res) => {
        try {
            const { bname, bslug, description, bvideo, user, bslides, organization, event } = req.body;
            // console.log(req.headers);
            //VALIDATE ALL FIELD INSERTED
            if (!bname || !bslug || !description || !bvideo || !user || !organization || !event) return res.status(400).json({ msg: "Please fill in all fields." });

            // //VALIDATE STING VALUES
            if (bname.length > 300 || bname.length < 2) return res.status(400).json({ msg: "Input should not less than 2 characters, and more than 300 characters." });
            if (bslug.length > 50 || bslug.length < 5) return res.status(400).json({ msg: "Input should not less than 5 characters, and more than 50 characters." });
            if (description.length > 2000 || description.length < 5)
                return res.status(400).json({ msg: "Input should not less than 5 characters, and more than 2000 characters." });
            // if (!validateYoutube(bvideo)) return res.status(400).json({ msg: "Invalid Youtube link." });

            let addBooth = new Booth({
                bname: bname,
                bslug: bslug,
                description: description,
                bvideo: bvideo,
                bslides: bslides,
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

            // const organization = await Organization.findById(booth.organization);

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
        const { bslug, eslug } = req.params;

        try {
            const event = await Event.findOne({ eslug: eslug });
            const booth = await Booth.findOne({ bslug: bslug });

            //FIX ENSURE THE INPUTS, REMOVE UNUSED VARIABLES, AND REMOVE BSLUG FOR CHANGES.
            const { bname, bUpdatedslug, description, bimage, bvideo, bslides, user, organizationId } = req.body;
            await Booth.findOneAndUpdate(
                { _id: booth._id },
                {
                    bname: bname,
                    bslug: bslug,
                    bimage: bimage,
                    description: description,
                    bvideo: bvideo,
                    bslides: bslides,
                }
            );

            res.json({ msg: "Update booth success" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // DELETE SINGLE BOOTH
    deleteBooth: async (req, res) => {
        const { bslug } = req.params;
        try {
            const booth = await Booth.findOne({ bslug: bslug });
            await Booth.findByIdAndDelete(booth._id);

            res.json({ msg: "Delete booth success" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    viewBoothOrganizer: async (req, res) => {
        const { bslug } = req.params;
        try {
            const booth = await Booth.findOne({ bslug: bslug });
            const organization = await Organization.findById(booth.organization);

            res.json(organization);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //CREATE STREAMING ROOM
    createRoom: async (req, res) => {
        //CREATE ROOM, AND REDIRECT USER TO THAT UNIQUE ROOM
        // res.redirect(`/event/${eslug}/booth/${bslug}/stream/${uuidV4()}`);
        // window.location.href = `/event/${eslug}/booth/${bslug}/stream/${uuidV4()}`;
        // res.redirect(`/stream/${uuidV4()}`);
    },
    //STREAMING ROOM
    streamingRoom: async (req, res) => {
        // const { bslug } = req.params;
        const { room } = req.params.room;
        console.log(room);
        // res.render("room", { roomId: req.params.room });

        // res.Render("room", { roomId: req.params.room });
        try {
            res.json({ msg: "Streaming Room" });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
};

function validateYoutube(url) {
    var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    return re.test(url);
}

function validateFacebook(url) {
    var re = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;

    return re.test(url);
}

module.exports = boothCtrl;
