import { getUser, signin, signup } from '../controllers/usersController'
import { validateUser } from '../validators/users'
import { Router } from 'express'
const router = Router()

router.get('/', getUser)
router.post('/signup', validateUser, signup)
router.post('/signin', validateUser, signin)

export default router
