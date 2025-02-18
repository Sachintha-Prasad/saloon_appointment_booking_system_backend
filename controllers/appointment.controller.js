import asyncErrorHandler from "../util/async-error-handler.js"
import CustomError from "../util/custom-error.js"
import { validateRequest } from "../util/validators.js"
import Appointment from "../models/appointment.model.js"

// @desc   create an appointment
// @route  POST /api/v1/appointments
// @access private
export const createAppointment = asyncErrorHandler(async (req, res) => {
    validateRequest(req)

    const { clientId, stylistId, serviceId, date, slotNumber } = req.body

    const isExistingAppointment = await Appointment.findOne({
        stylistId,
        date,
        slotNumber,
    })

    if (isExistingAppointment) {
        throw new CustomError(
            "appointment already exists for this stylist at this slot",
            400
        )
    }

    const newAppointment = new Appointment({
        clientId,
        stylistId,
        serviceId,
        date,
        slotNumber,
    })

    const appointment = await newAppointment.save()
    res.status(201).json(appointment)
})
