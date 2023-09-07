import { pool } from '../db.js'


export const getUsers = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM user')
		res.send(rows)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getUser = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ?', [req.params.id])

		if (rows.length <= 0) {
			return res.status(404).json({
				message: 'User not found'
			})
		}

		res.json(rows[0])

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getUserIdByEmail = async (req, res) => {
	try {
		
		const [rows] = await pool.query('SELECT user_id FROM user WHERE email = ?', [req.params.email])

		if (rows.length <= 0) {
			return res.status(404).json({
				message: 'User not found',
			})
		}

		res.json(rows[0].user_id)
	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong',
		});
	}
};

export const createUser = async (req, res) => {
	const { name, email, number } = req.body

	try {

		const [rows] = await pool.query('INSERT INTO user (name, email, number) VALUES (?, ?, ?)', [name, email, number])
		res.send({
			user_id: rows.insertId,
			name,
			email,
			number
		})

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const updateUser = async (req, res) => {
	const { id } = req.params
	const { name, email, number } = req.body

	try {

		const [result] = await pool.query('UPDATE user SET name = IFNULL(?, name), email = IFNULL(?, email), number = IFNULL(?, number) WHERE user_id = ?', [name, email, number, id])

		if (result.affectedRows === 0) return res.status(404).json({
			message: 'User not found'
		})

		const [rows] = await pool.query('SELECT * FROM user WHERE user_id = ?', [id])
		res.json(rows[0])

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const deleteUser = async (req, res) => {
	try {

		const [result] = await pool.query('DELETE FROM user WHERE user_id = ?', [req.params.id])

		if (result.affectedRows <= 0) return res.status(404).json({
			message: 'User not found'
		})

		res.sendStatus(204)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}