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
            default: "https://res.cloudinary.com/cloudfair/image/upload/v1626333383/avatar/event-default-bg.jpg",
        },
        startDate: {
            type: Date,
            required: [true, "Please enter your event start date!"],
        },
        endDate: {
            type: Date,
            required: [true, "Please enter your event end date!"],
        },
        organization: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization",
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        // booth: { type: mongoose.Schema.Types.ObjectId, ref: 'Booth' },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Event", eventSchema);
