import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        mobileNo: { type: String, required: true, unique: true },
        role: {
            type: String,
            enum: ["admin", "stylist", "client"],
            default: "client",
            required: true,
        },
    },
    { timestamps: true, discriminatorKey: "role" }
)

const User = mongoose.model("User", UserSchema)
export default User
