import jwt from "jsonwebtoken"
import CustomError from "../util/custom-error.js"

const { verify } = jwt

const verifyToken = (req, res, next) => {
    let token
    let authHeader = req.headers.authorization

    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]

        if (!token) {
            throw new CustomError("no token, authorization denied", 401)
        }

        try {
            const decode = verify(token, process.env.JWT_SECRET)
            req.user = decode
            next()
        } catch (error) {
            throw new CustomError("token is invalid", 401)
        }
    } else {
        throw new CustomError("no token, authorization denied", 401)
    }
}

export default verifyToken
