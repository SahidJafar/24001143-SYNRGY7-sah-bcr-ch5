import { Router, Request, Response } from 'express'
import apiRouter from './apiRouter'


export const router = Router()

router.use('/api/v1', apiRouter)

router.get('/', (req:Request, res:Response)=>{
    res.status(200).json({
        code:200,
        status:'success',
        message: 'Welcome to BCR Car Rental',
        data:null
    })
})

router.use((req:Request, res:Response) => {
    res.status(404).json({
      code: 404,
      status: 'error',
      message: 'Route not found',
      data: null
    })
  })

export default router