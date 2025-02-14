import { connect as _connect } from "mongoose"

const connectDB = async () => {
    try {
        const connect = await _connect(process.env.DB_CONNECTION_STRING)
        console.log(
            `Database connected: ${connect.connection.host}, ${connect.connection.name}`
        )
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB
