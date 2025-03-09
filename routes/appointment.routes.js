import express from "express"
import {
    acceptAppointment,
    cancelAppointment,
    createAppointment,
    getAvailableSlots,
    rejectAppointment,
} from "../controllers/appointment.controller.js"
import { body, param, query } from "express-validator"
import verifyToken from "../middlewares/verify-token.middleware.js"
import authorizeRoles from "../middlewares/authorize-role.middleware.js"
import validateRequest from "../middlewares/validate-request.middleware.js"

const router = express.Router()

// create an appointment
router.post(
    "/",
    verifyToken,
    authorizeRoles("client", "admin"),
    body("clientId")
        .notEmpty()
        .withMessage("client id is required")
        .isMongoId()
        .withMessage("invalid client id"),
    body("stylistId")
        .notEmpty()
        .withMessage("stylist id is required")
        .isMongoId()
        .withMessage("invalid stylist id"),
    body("date")
        .notEmpty()
        .withMessage("date is required")
        .isISO8601()
        .withMessage("invalid date"),
    body("slotNumber")
        .notEmpty()
        .withMessage("slot number is required")
        .isInt({ min: 1, max: 8 })
        .withMessage("invalid slot number"),
    validateRequest,
    createAppointment
)

// get available slots
router.get(
    "/available-slots",
    verifyToken,
    authorizeRoles("client", "admin"),
    query("stylistId")
        .notEmpty()
        .withMessage("stylist id is required")
        .isMongoId()
        .withMessage("invalid stylist id"),
    query("date")
        .notEmpty()
        .withMessage("date is required")
        .isISO8601()
        .withMessage("invalid date"),
    validateRequest,
    getAvailableSlots
)

// accept an appointment
router.put(
    "/:id/accept",
    verifyToken,
    authorizeRoles("stylist", "admin"),
    param("id")
        .notEmpty()
        .withMessage("appointment id is required")
        .isMongoId()
        .withMessage("invalid appointment id"),
    validateRequest,
    acceptAppointment
)

// reject an appointment
router.put(
    "/:id/reject",
    verifyToken,
    authorizeRoles("stylist", "admin"),
    param("id")
        .notEmpty()
        .withMessage("appointment id is required")
        .isMongoId()
        .withMessage("invalid appointment id"),
    validateRequest,
    rejectAppointment
)

// cancel an appointment
router.put(
    "/:id/cancel",
    verifyToken,
    authorizeRoles("client", "admin"),
    param("id")
        .notEmpty()
        .withMessage("appointment id is required")
        .isMongoId()
        .withMessage("invalid appointment id"),
    validateRequest,
    cancelAppointment
)

export default router
