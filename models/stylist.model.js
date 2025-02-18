import mongoose from "mongoose"
import User from "./user.model"

const StylistSchema = new mongoose.Schema({
    isActive: {
        type: Boolean,
        default: true,
    },
    servicesOffered: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Service",
            validate: {
                validator: async function (serviceId) {
                    return await mongoose
                        .models("Service")
                        .exists({ _id: serviceId })
                },
                message: "service does not exist",
            },
        },
    ],
})

const Stylist = User.discriminator("stylist", StylistSchema)
export default Stylist
