const Organizations = require("../models/Organization");
const Users = require("../models/userModel");

const organizationCtrl = {
    createOrg: async (req, res) => {
        try {
            const { orgName, orgEmail, orgAbout, LoggedUserId } = req.body;

            // Verify all information filled
            if (!orgName || !orgEmail) return res.status(400).json({ msg: "Please fill in the essential information" });

            // Verify email
            if (!validateEmail(orgEmail)) return res.status(400).json({ msg: "Invalid emails." });

            // Validate unique organization
            const organizationName = await Organizations.findOne({ orgName });

            if (organizationName) return res.status(400).json({ msg: "This organization name already exists." });

            // const user = await Users.findOne({ _id: req.user.id });
            const user = await Users.findOne({ orgEmail });
            const newOrg = new Organizations({
                organizationName: orgName,
                organizationEmail: orgEmail,
                organizationAbout: orgAbout,
                organizationCreatorId: LoggedUserId,
            });

            //Save userId for creatorId
            await newOrg.save();
            res.json;

            // console.log(req.body)
            res.json({ msg: "Organization has been created " });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    viewOrg: async (req, res) => {
        try {
            const user = await Users.findById(req.user.id).select("-password");
            const organization = await Organizations.find({ organizationCreatorId: user._id });

            // const user = await Users.findById(req.user.id).select("-password");
            res.json(organization);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    editOrg: async (req, res) => {
        const user = await Users.findById(req.user.id).select("-password");
        const organization = await Organizations.findOne({ organizationCreatorId: user._id });
        const { organizationName, organizationAbout, organizationBackground, organizationEmail } = req.body;

        // console.log(organizationName, organizationAbout, organizationBackground, organizationEmail);
        console.log(organization._id);
        await Organizations.findOneAndUpdate(
            { _id: organization._id },
            {
                organizationName: organizationName,
                organizationAbout: organizationAbout,
                organizationBackground: organizationBackground,
                organizationEmail: organizationEmail,
            }
        );
        res.json({ msg: "Update Organization Success" });
    },
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = organizationCtrl;
