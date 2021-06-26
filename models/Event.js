const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
    {
        ename: {
            type: String,
            required: [true, "Please enter your event name!"],
            trim: true,
        },
        eslug: {
            type: String,
            required: [true, "Please enter your event slug!"],
            trim: true,
        },
        description: {
            type: String,
            required: [true, "Please enter your event description!"],
            trim: true,
        },
        eBackground: {
            type: String,
            default: "https://res.cloudinary.com/cloudfair/image/upload/v1624370050/organization/orgBackground/default_background.jpg",
        },
        startDate: {
            type: Date,
            required: [true, "Please enter your event start date!"],
        },
        endDate: {
            type: Date,
            required: [true, "Please enter your event end date!"],
        },
        user: {
            type: String,
            ref: "User",
        },
        organization: {
            type: String,
            required: true,
        },
        // booth: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth' },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Event", eventSchema);
