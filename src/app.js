import express from 'express'
import contactRoutes from './routes/contacts.routes.js'
import hazardsRoutes from './routes/hazards.routes.js'
import incidentRoutes from './routes/incidents.routes.js'
import incidentTypesRoutes from './routes/incidentTypes.routes.js'
import usersRoutes from './routes/users.routes.js'
import manualsRoutes from './routes/manuals.routes.js'


const app = express()

app.use(express.json())

app.use('/api',contactRoutes)
app.use('/api',hazardsRoutes)
app.use('/api',incidentRoutes)
app.use('/api',incidentTypesRoutes)
app.use('/api',usersRoutes)
app.use('/api',manualsRoutes)

app.use((req, res, next) => {
	res.status(404).json({
		message: 'endpoint not found'
	})
})

export default app