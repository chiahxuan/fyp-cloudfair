const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        organizationName: {
            type: String,
            required: [true, "Please enter your organization name!"],
            trim: true,
            unique: true,
        },
        organizationEmail: {
            type: String,
            required: [true, "Please enter your organization email!"],
            trim: true,
            unique: true,
        },
        organizationAbout: {
            type: String,
            required: [true, "Please enter your organization description!"],
            trim: true,
        },
        organizationCreatorId: { // need to consider this attribute
            type: String,
            required: true,
            trim: true,
            // default: 
        },
        organizationAvatar: {
            type: String,
            default:
                "https://res.cloudinary.com/cloudfair/image/upload/v1624369488/organization/orgAvatar/organization_default.png",
        },
        organizationBackground: {
            type: String,
            default:
                "https://res.cloudinary.com/cloudfair/image/upload/v1624370050/organization/orgBackground/default_background.jpg",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Organization", organizationSchema);
