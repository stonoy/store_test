const express = require("express")
const cors = require("cors")
require("express-async-errors")
require("dotenv").config()
const path = require("path")

const connectDB = require("./config/db_connection")
const userRoutes = require("./routes/user")
const errorMiddleware = require("./middlewares/errorMiddlewares")
const cookieParser = require("cookie-parser")

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin : "http://localhost:5173",
    credentials: true
}))

app.use(express.static(path.resolve(__dirname, "./client/dist"))); // PROVIDING FRONTEND APP

// routes
app.use("/api/user", userRoutes)

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./client/dist", "index.html")); // SERVER GIVEING FRONTEND APP TO USERS
  });

// no matching routes
app.use("*", (req, res) => {
    res.status(404).send("No such route found")
})

// catch error
app.use(errorMiddleware)

const port = process.env.PORT || "8080"

connectDB(process.env.URI)
    .then(() => {
        app.listen(port, () => {
        console.log(`server is listenning on port ${port}`)
        })
    })
    .catch((err) => {
        console.log(`error in connecting database -> ${err}`)
    })