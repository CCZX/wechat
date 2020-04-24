import { NextFunction, Request, Response, Router } from 'express'
import UserController from './../controller/user'

const userController: UserController = new UserController()
const router: Router = Router()

router.get('/all', userController.all)
router.get('/find', userController.find)

export default router
