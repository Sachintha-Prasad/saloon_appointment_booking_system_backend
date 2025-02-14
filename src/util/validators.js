import { validationResult } from "express-validator"
import CustomError from "./custom-error.js"

export const validateRequest = (req) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        throw new CustomError("validation failed", 400, errors.array())
    }
}

export const validateObjectId = (id) => {
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw new CustomError("invalid resource id", 400)
    }
}
