import express from "express"
import { body, query } from "express-validator"
import {
    getStylistLeaves,
    requestLeave,
} from "../controllers/leave.controller.js"
import verifyToken from "../middlewares/verify-token.middleware.js"
import authorizeRoles from "../middlewares/authorize-role.middleware.js"
import validateRequest from "../middlewares/validate-request.middleware.js"

const router = express.Router()

// request leave
router.post(
    "/",
    verifyToken,
    authorizeRoles("stylist"),
    body("stylistId")
        .notEmpty()
        .withMessage("stylist id required")
        .isMongoId()
        .withMessage("invalid stylist id"),
    body("date")
        .notEmpty()
        .withMessage("date is required")
        .isISO8601()
        .withMessage("invalid date"),
    validateRequest,
    requestLeave
)

// get all leave dates for a specific stylist
router.get(
    "/",
    verifyToken,
    authorizeRoles("stylist", "admin"), // allow both stylist and admin to view
    query("stylistId")
        .notEmpty()
        .withMessage("stylist id required")
        .isMongoId()
        .withMessage("invalid stylist id"),
    validateRequest,
    getStylistLeaves
)

export default router
