import { Router } from 'express'
import { getContacts, getContact, getContactsByEmail,  getContactsByUser, createContact, updateContact, deleteContact } from '../controllers/contacts.controller.js'


const router = Router()

router.get('/contacts', getContacts)

router.get('/contacts/:id', getContact)

router.get('/contacts_by_user/:user_id', getContactsByUser)

router.get('/contacts_by_email/:email', getContactsByEmail)

router.post('/contacts', createContact)

router.patch('/contacts/:id', updateContact)

router.delete('/contacts/:id', deleteContact)


export default router