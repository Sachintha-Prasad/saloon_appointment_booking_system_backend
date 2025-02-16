import mongoose from "mongoose"

const leaveSchema = new mongoose.Schema(
    {
        stylistId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            validate: {
                validator: async function (userId) {
                    const user = await mongoose.models("User").findById(userId)
                    return user.role === "stylist"
                },
                message: "user is not a stylist",
            },
        },
        date: {
            type: Date,
            required: true,
            index: true,
        },
    },
    { timestamps: true, versionKey: false }
)

const Leave = mongoose.model("Leave", leaveSchema)
export default Leave
