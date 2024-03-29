const mongoose = require("mongoose");

const boothSchema = new mongoose.Schema(
    {
        bname: {
            type: String,
            required: true,
        },
        bslug: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        bimage: {
            type: String,
            required: true,
            default: "https://res.cloudinary.com/cloudfair/image/upload/v1626333119/avatar/modern-exhibition.jpg",
        },
        bvideo: {
            type: String,
            required: true,
        },
        bslides: {
            type: String,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        organization: { type: mongoose.Schema.Types.ObjectId, ref: "Organization" },
        event: { type: mongoose.Schema.Types.ObjectId, ref: "Event" },
    },
    { timestamps: true }
);
module.exports = mongoose.model("Booth", boothSchema);
