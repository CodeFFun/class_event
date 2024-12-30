import express from "express"
import userRouter from "./user.js"
import authRouter from "./auth.js"

const router = express.Router()

router.use("auth", userRouter)
router.use("user", authRouter)


export default router
