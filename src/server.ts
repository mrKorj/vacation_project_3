import express from 'express'
import expressJwt from 'express-jwt'
import socketIo from 'socket.io'
import http from 'http'
import {vacationRouter} from "./routers/vacationRouter"
import {authRouter} from "./routers/authRouter"

import {generateHashPassForAdmin} from "./db/dbQueries";

const PORT = process.env.PORT || 4000
export const {SECRET = 'secret'} = process.env;
export const {adminPassword = '12345'} = process.env

const app = express()
app.use(express.json())
const server = http.createServer(app)
const io = socketIo(server)

io.on('connection', (socket) => {
    console.log('IO connected')
    socket.on('disconnect', () => {
        console.log('IO disconnected')
    })
})

app.use(expressJwt({secret: SECRET}).unless({path: new RegExp('/api/auth.*/', 'i')}))

app.use('/api', vacationRouter)
app.use('/api/auth', authRouter)

generateHashPassForAdmin()

server.listen(PORT, () => console.log(`Server is up at port ${PORT}...`))
