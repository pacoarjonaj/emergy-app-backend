import { pool } from '../db.js'


export const getHazards = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM type_of_hazard')
		res.send(rows)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}