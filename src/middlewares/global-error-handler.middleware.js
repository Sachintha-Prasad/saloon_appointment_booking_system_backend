function globalErrorHandler(error, req, res, next) {
    error.statusCode = error.statusCode || 500
    error.status = error.status || "error"
    error.message = error.message || "internal server Error"

    res.status(error.statusCode).json({
        status: error.statusCode,
        message: error.message,
    })
}

export default globalErrorHandler
