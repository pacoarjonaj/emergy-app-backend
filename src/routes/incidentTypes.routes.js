import { Router } from 'express'
import { getIncidentTypes } from '../controllers/incidentTypes.controller.js'


const router = Router()

router.get('/type_of_incidents', getIncidentTypes)


export default router