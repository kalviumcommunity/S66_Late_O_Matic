const mongoose = require("mongoose");

const excuseSchema = new mongoose.Schema(
    {
        excuse: { type: String, required: true },
        created_by: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
        likes: { type: Number, default: 0 },
        liked_by: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }], // Track users who liked it
    },
    { timestamps: true }
);

module.exports = mongoose.model("excuses", excuseSchema);
