import express from 'express'
const routes = express()

import user from './routes/user.routes'
import anime from './routes/anime.routes'

routes.use('/user', user)
routes.use('/anime', anime)

export default routes
