import { pool } from '../db.js'


export const getIncidents = async (req, res) => {
	try { 

		const [rows] = await pool.query('SELECT * FROM incident')
		res.send(rows)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getIncident = async (req, res) => {
	try {
		
		const [rows] = await pool.query('SELECT * FROM incident where incident_id = ?', [req.params.id])

		if (rows.length <=0) return res.status(404).json({
			message: "Incident not found"
		}) 

		res.json(rows[0])

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getIncidentsByUserEmail = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM incident where user_email = ?', [req.params.user_email])

		if (rows.length <=0) return res.status(404).json({
			message: "Incident not found"
		}) 

		res.json(rows)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const createIncident = async (req, res) => {
	const { date, mayorIncident, location, type, hazard, access, casualtiesDescription, adults, children, fatalities, servicesDescription, sanitary, firefighting, rescue, user_name, user_email } = req.body

	try {

		const [rows] = await pool.query('INSERT INTO incident (date, mayorIncident, location, type, hazard, access, casualtiesDescription, adults, children, fatalities, servicesDescription, sanitary, firefighting, rescue, user_name, user_email) VALUES (?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?, ?, ?, ?, ?, ?)', [date, mayorIncident, location, type, hazard, access, casualtiesDescription, adults, children, fatalities, servicesDescription, sanitary, firefighting, rescue, user_name, user_email]) 

		res.send({
			id: rows.insertId,
			date, 
			mayorIncident, 
			location, 
			type, 
			hazard, 
			access, 
			casualtiesDescription, 
			adults, 
			children, 
			fatalities, 
			servicesDescription, 
			sanitary, 
			firefighting, 
			rescue, 
			user_name, 
			user_email
		})

	} catch(error) {
		return res.status(500).json({
			message: (error)
		})
	}
}

export const updateIncident = async (req, res) => {
	const { id } = req.params
	const { mayorIncident, location, type, hazard, access, casualties } = req.body

	try {

		const [result] = await pool.query('UPDATE incident SET mayorIncident = IFNULL(?, mayorIncident), location = IFNULL(?, location), type = IFNULL(?, type), hazard = IFNULL(?, hazard), access = IFNULL(?, access), casualties = IFNULL(?, casualties), user_id = user_id WHERE incident_id = ?', [mayorIncident, location, type, hazard, access, casualties, id])

		if (result.affectedRows <= 0) return res.status(404).json({
			message: "Incident not found"
		})

		const [rows] = await pool.query('SELECT * FROM incident where incident_id = ?', [id])
		res.json(rows[0])


	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}

}

export const deleteIncident = async (req, res) => {
	try {
		
		const [result] = await pool.query('DELETE FROM incident WHERE incident_id = ?', [req.params.id])

		if (result.affectedRows <=0) return res.status(404).json({
			message: 'Incident not found'
		}) 

		res.sendStatus(204)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}