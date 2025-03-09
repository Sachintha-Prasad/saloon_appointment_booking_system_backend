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
import validateRequest from "../middlewares/validate-request.middleware.js"

const router = express.Router()

// admin-protected routes

// create a service
router.post(
    "/add",
    verifyToken,
    authorizeRoles("admin"),
    [
        body("name")
            .notEmpty()
            .withMessage("name is required")
            .isString()
            .withMessage("name must be a string"),
        body("duration")
            .notEmpty()
            .withMessage("duration is required")
            .isNumeric()
            .withMessage("duration must be a number"),
        body("price")
            .notEmpty()
            .withMessage("price is required")
            .isNumeric()
            .withMessage("price must be a number"),
        body("serviceImageUrl")
            .notEmpty()
            .withMessage("image is required")
            .isURL()
            .withMessage("image must be a valid URL"),
    ],
    validateRequest,
    createService
)

// update a service
router.put(
    "/:id",
    verifyToken,
    authorizeRoles("admin"),
    [
        body("name").optional().isString().withMessage("name must be a string"),
        body("duration")
            .optional()
            .isNumeric()
            .withMessage("duration must be a number"),
        body("price")
            .optional()
            .isNumeric()
            .withMessage("price must be a number"),
        body("serviceImageUrl")
            .optional()
            .isURL()
            .withMessage("image must be a valid URL"),
    ],
    validateRequest,
    updateService
)

// delete a service
router.delete("/:id", verifyToken, authorizeRoles("admin"), deleteService)

// public routes

// get all services
router.get(
    "/",
    verifyToken,
    authorizeRoles("admin", "client", "stylist"),
    getServices
)

// get a service by id
router.get(
    "/:id",
    verifyToken,
    authorizeRoles("admin", "client", "stylist"),
    getServiceById
)

export default router
