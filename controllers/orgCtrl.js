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
                organizationCreatorId: "userID",
            });

            //Save userId for creatorId
            await newOrg.save();
            res.json;

            // console.log(req.body)
            res.json({ msg: "Organization has been created " + user });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    editOrg: 
};

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

module.exports = organizationCtrl;
