import express from "express"
import { body } from "express-validator"
import { requestLeave } from "../controllers/leave.controller.js"
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

export default router
