import Leave from "../models/leave.model.js"
import asyncErrorHandler from "../util/async-error-handler.js"

// @desc request leave
// @route POST /api/v1/leaves
// @access private
export const requestLeave = asyncErrorHandler(async (req, res) => {
    const { stylistId, date } = req.body

    // check if leave already exists for this stylist on this date
    const isLeaveExists = await Leave.findOne({ stylistId, date })
    if (isLeaveExists) {
        throw new CustomError(
            "leave already exists for this stylist on this date",
            400
        )
    }

    const newLeave = new Leave({
        stylistId,
        date,
    })

    const leave = await newLeave.save()
    res.status(201).json(leave)
})

// @desc Get all leave dates for a specific stylist
// @route GET /api/v1/leaves?stylistId=stylistId
// @access private
export const getStylistLeaves = asyncErrorHandler(async (req, res) => {
    const { stylistId } = req.query

    if (!stylistId) {
        return res.status(400).json({ message: "stylistId query is required" })
    }

    const leaves = await Leave.find({ stylistId }).select("date -_id")

    const leaveDates = leaves.map((leave) => ({ date: leave.date }))
    res.status(200).json({ leaves: leaveDates })
})
