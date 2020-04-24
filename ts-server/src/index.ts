import express, { Express, Request, Response } from 'express'
import path from 'path'
import UserRouter from './routers/user'
import middleware from './middleware'
import { ServeStaticOptions } from 'serve-static';

const app: Express = express()

/**静态资源文件 */
const StaticOptions: ServeStaticOptions = {
  setHeaders(res: Response) {
    res.set('Access-Control-Allow-Origin', '*')
  }
}

const launch:Function = ():void => {
  middleware(app)
  app.use(express.static(path.join(__dirname, 'public'), StaticOptions))
  app.get('/', (req: Request, res: Response) => {
    return res.send('hello')
  })
  app.use('/user', UserRouter)
  app.listen(6060, () => {
    console.log('>>> success!!! ts-express server is runing 6060...')
  })
}

launch()
 