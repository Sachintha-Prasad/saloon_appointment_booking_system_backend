import express from "express"
import { createAppointment } from "../controllers/appointment.controller.js"
import { body } from "express-validator"
import verifyToken from "../middlewares/verify-token.middleware.js"
import authorizeRoles from "../middlewares/authorize-role.middleware.js"

const router = express.Router()

router.post(
    "/",
    verifyToken,
    authorizeRoles("client", "admin"),
    body("clientId")
        .isMongoId()
        .withMessage("invalid client id")
        .not()
        .isEmpty(),
    body("stylistId")
        .isMongoId()
        .withMessage("invalid stylist id")
        .not()
        .isEmpty(),
    body("serviceId")
        .isMongoId()
        .withMessage("invalid service id")
        .not()
        .isEmpty(),
    body("date").isISO8601().withMessage("invalid date").not().isEmpty(),
    body("slotNumber")
        .isInt({ min: 1, max: 8 })
        .withMessage("invalid slot number")
        .not()
        .isEmpty(),
    createAppointment
)

export default router
