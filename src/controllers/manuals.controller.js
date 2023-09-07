import { pool } from '../db.js'


export const getManuals = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM emergency_manuals')
		res.send(rows)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getManual = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM emergency_manuals WHERE manual_id = ?', [req.params.id])

		if (rows.length <= 0) return res.status(404).json({
			message: 'Manual not found'
		})

		res.json(rows[0])

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}
