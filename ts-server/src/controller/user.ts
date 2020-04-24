import { NextFunction, Request, Response, Router } from 'express'
import UserCollection from './../models/user'

export default class UserController {
  public async add() {
    UserCollection
  }
  public async all(req: Request, res: Response ,next: NextFunction): Promise<Response | void> {
    return res.send('hello user')
  }
  public async find(req: Request, res: Response, next: NextFunction) {
    const data = await UserCollection.find({name: 'cc1218'})
    return res.send(data)
  }
}
