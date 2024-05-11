import mongoose, { Schema } from "mongoose"

const accountSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true
    }
});

export const Account = mongoose.model("Account", accountSchema)