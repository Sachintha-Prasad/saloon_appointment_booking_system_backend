import express from "express"
import { body } from "express-validator"
import {
    createService,
    getServices,
    getServiceById,
    updateService,
    deleteService,
} from "../controllers/service.controller.js"

const router = express.Router()

// admin-protected routes
router.post(
    "/",
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

router.delete("/:id", deleteService)

// public routes
router.get("/", getServices)
router.get("/:id", getServiceById)

export default router
