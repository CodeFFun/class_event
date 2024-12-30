import express from "express"

const userRouter = express.Router()

userRouter.get('/')
userRouter.get('/:id')
userRouter.post('/')
userRouter.patch('/:id')
userRouter.delete('/:id')
userRouter.delete('/')


export default userRouter
