import { Router } from 'express'
import { getUsers, getUser, getUserIdByEmail, createUser, updateUser, deleteUser } from '../controllers/users.controller.js'


const router = Router()

router.get('/users', getUsers)

router.get('/users/:id', getUser)

router.get('/user_id/:email', getUserIdByEmail)

router.post('/users', createUser)

router.patch('/users/:id', updateUser)

router.delete('/users/:id', deleteUser)

export default router