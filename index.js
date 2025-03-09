import express from "express"
import connectDB from "./config/db.js"
import dotenv from "dotenv"
import cors from "cors"
import appointmentRoutes from "./routes/appointment.routes.js"
import authRoutes from "./routes/auth.routes.js"
import userRoutes from "./routes/user.routes.js"
import serviceRoutes from "./routes/service.routes.js"
import leaveRoutes from "./routes/leave.routes.js"
import CustomError from "./util/custom-error.js"
import globalErrorHandler from "./middlewares/global-error-handler.middleware.js"
import morgan from "morgan"
import logger from "./util/logger.js"

// load env variables
dotenv.config()

// express app
const app = express()

// database connection
connectDB()

// middlewares
app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
)
app.use(express.json())

// morgan logger
const morganFormat = ":method :url :status :response-time ms"
app.use(
    morgan(morganFormat, {
        stream: {
            write: (message) => {
                const logObject = {
                    method: message.split(" ")[0],
                    url: message.split(" ")[1],
                    status: message.split(" ")[2],
                    responseTime: message.split(" ")[3],
                }
                logger.info(JSON.stringify(logObject))
            },
        },
    })
)

// routes
const baseUrl = "/api/v1"

app.use(`${baseUrl}/auth`, authRoutes)
app.use(`${baseUrl}/users`, userRoutes)
app.use(`${baseUrl}/appointments`, appointmentRoutes)
app.use(`${baseUrl}/services`, serviceRoutes)
app.use(`${baseUrl}/leaves`, leaveRoutes)

// 404 route
app.all("*", (req, res, next) => {
    const error = new CustomError(
        `can't find ${req.originalUrl} on this server`,
        404
    )
    next(error)
})

// global error handling middleware
app.use(globalErrorHandler)

// app starts here
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`server running on port ${port}`)
})
