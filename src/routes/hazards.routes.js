import { Router } from 'express'
import { getHazards } from '../controllers/hazards.controller.js'


const router = Router()

router.get('/type_of_hazards', getHazards)


export default router