import express from "express"
import authRoutes from "./auth.routes.js"
import userRoutes from "./user.routes.js"
import appointmentRoutes from "./appointment.routes.js"
import serviceRoutes from "./service.routes.js"
import leaveRoutes from "./leave.routes.js"

const router = express.Router()

const       baseUrl = "/api/v1"

router.use(`${baseUrl}/auth`, authRoutes)
router.use(`${baseUrl}/users`, userRoutes)
router.use(`${baseUrl}/appointments`, appointmentRoutes)
router.use(`${baseUrl}/services`, serviceRoutes)
router.use(`${baseUrl}/leaves`, leaveRoutes)

export default router
