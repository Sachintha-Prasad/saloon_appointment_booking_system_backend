import mongoose from "mongoose"

const ServiceSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        duration: { type: Number, required: true },
        price: { type: Number, required: true },
        serviceImageUrl: { type: String, required: true },
    },
    { timestamps: true }
)

const Service = mongoose.model("Service", ServiceSchema)
export default Service
