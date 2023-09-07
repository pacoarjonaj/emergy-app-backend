import { Router } from 'express'
import { getIncidents, getIncident, getIncidentsByUserEmail, createIncident, deleteIncident } from '../controllers/incidents.controller.js'


const router = Router()

router.get('/incidents', getIncidents)

router.get('/incidents/:id', getIncident)

router.get('/incidents_by_user_email/:user_email', getIncidentsByUserEmail)

router.post('/incidents', createIncident)

router.delete('/incidents/:id', deleteIncident)


export default router