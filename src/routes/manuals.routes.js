import { Router } from 'express'
import { getManual, getManuals } from '../controllers/manuals.controller.js'


const router = Router()

router.get('/manuals', getManuals)

router.get('/manuals/:id', getManual)

export default router