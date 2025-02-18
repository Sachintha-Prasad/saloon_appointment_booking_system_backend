import express from "express"
import { body } from "express-validator"
import {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
} from "../controllers/service.controller.js"
import authorizeRoles from "../middlewares/authorize-role.middleware.js"
import verifyToken from "../middlewares/verify-token.middleware.js"

const router = express.Router()

// admin-protected routes
router.post(
    "/add",
    verifyToken,
    authorizeRoles("admin"),
    [
        [
            body("name", "Name is required").not().isEmpty(),
            body("duration", "Duration is required").isNumeric(),
            body("price", "Price is required").isNumeric(),
            body("serviceImageUrl", "Image URL is required").not().isEmpty(),
        ],
    ],
    createService
)

router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    [
        [
            body("name", "Name is required").optional().not().isEmpty(),
            body("duration", "Duration is required").optional().isNumeric(),
            body("price", "Price is required").optional().isNumeric(),
            body("serviceImageUrl", "Image URL is required")
                .optional()
                .not()
                .isEmpty(),
        ],
    ],
    updateService
)

router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteService)

// public routes
router.get(
    "/",
    verifyToken,
    authorizeRoles("admin", "client", "stylist"),
    getServices
)
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "client", "stylist"),
    getServiceById
)

export default router
