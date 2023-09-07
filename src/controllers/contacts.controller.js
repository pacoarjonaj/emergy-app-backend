import { pool } from '../db.js'


export const getContacts = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM contact')
		res.send(rows)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getContact = async (req, res) => {
	try {
		
		const [rows] = await pool.query('SELECT * FROM contact WHERE contact_id = ?', [req.params.id])

		if (rows.length <=0) return res.status(404).json({
			message: "Contact not found"
		}) 

		res.json(rows[0])

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getContactsByUser = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT * FROM contact WHERE user_id = ?', [req.params.user_id])

		if (rows.length <=0) return res.status(404).json({
			message: "Contacts not found"
		}) 

		res.json(rows)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const getContactsByEmail = async (req, res) => {
	try {

		const [rows] = await pool.query('SELECT c.* FROM contact AS c JOIN user AS u ON c.user_id = u.user_id WHERE u.email = ?', [req.params.email]);

		if (rows.length <= 0) {
			return res.status(404).json({
				message: "Contacts not found"
			});
		}

		res.json(rows);
	} catch (error) {
		return res.status(500).json({
			message: error
		});
	}
}


export const createContact = async (req, res) => {
	const {name, email, number, user_id} = req.body

	try {

		const [rows] = await pool.query('INSERT INTO contact (name, email, number, user_id) VALUES (?, ?, ?, ?)', [name, email, number, user_id]) 

		res.send({
			id: rows.insertId,
			name,
			email,
			number,
			user_id
		})

	} catch(error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const updateContact = async (req, res) => {
	const { id } = req.params
	const {name, email, number} = req.body

	try {

		const [result] = await pool.query('UPDATE contact SET name = IFNULL(?, name), email = IFNULL(?, email), number = IFNULL(?, number),, user_id = user_id WHERE contact_id = ?', [name, email, number, id])

		if (result.affectedRows === 0) return res.status(404).json({
			message: 'Contact not found'
		})

		const [rows] = await pool.query('SELECT * FROM contact WHERE contact_id = ?', [id])
		res.json(rows[0])

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

export const deleteContact = async (req, res) => {
	try {
		
		const [result] = await pool.query('DELETE FROM contact WHERE contact_id = ?', [req.params.id])

		if (result.affectedRows <=0) return res.status(404).json({
			message: 'Contact not found'
		}) 

		res.sendStatus(204)

	} catch (error) {
		return res.status(500).json({
			message: 'Something went wrong'
		})
	}
}

