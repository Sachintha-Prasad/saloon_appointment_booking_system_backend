import express from "express"
import { body } from "express-validator"
import {
    getLoggedInUser,
    login,
    register,
} from "../controllers/auth.controller.js"
import verifyToken from "../middlewares/verify-token.middleware.js"

const router = express.Router()

// auth routes
router.post(
    "/register",
    [
        [
            body("name", "Name is required").not().isEmpty(),
            body("email", "Email is required").isEmail().not().isEmpty(),
            body("password", "Password is required")
                .isLength({ min: 6 })
                .not()
                .isEmpty(),
            body("mobileNo", "Mobile number is required")
                .isMobilePhone()
                .not()
                .isEmpty(),
            body("role", "Role is required")
                .isIn(["admin", "client", "stylist"])
                .not()
                .isEmpty(),
        ],
    ],
    register
)

router.post(
    "/login",
    [
        [
            body("email", "Email is required").isEmail().not().isEmpty(),
            body("password", "Password is required").not().isEmpty(),
        ],
    ],
    login
)

router.get("/me", verifyToken, getLoggedInUser)

export default router
