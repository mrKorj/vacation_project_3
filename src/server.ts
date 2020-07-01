import express from 'express'
import expressJwt from 'express-jwt'
import socketIo from 'socket.io'
import http from 'http'
import fileUpload from 'express-fileupload'
import {vacationRouter} from "./routers/vacationRouter"
import {authorizationRouter} from "./routers/authorizationRouter"
import {generateHashPassForAdmin} from "./db/dbQueries";
import {authenticationRouter} from "./routers/authenticationRouter";

const PORT = process.env.PORT || 4000
export const {SECRET = 'secret'} = process.env;
export const {adminPassword = '12345'} = process.env

const app = express()
const server = http.createServer(app)
export const io = socketIo(server)

app.use(express.json())
app.use(fileUpload({createParentPath: true}))
app.use(expressJwt({secret: SECRET}).unless({path: [new RegExp('/api/authorization.*/', 'i'), new RegExp('/upload.*/', 'i')]}))

app.use('/api', function (req, res, next) {
    (req as any).io = io
    next()
})
app.use('/upload', express.static('upload'))
app.use('/api', vacationRouter)
app.use('/api/authorization', authorizationRouter)
app.use('/api/authentication', authenticationRouter)


io.on('connection', (socket) => {
    console.log('IO connected')
    socket.on('disconnect', () => {
        console.log('IO disconnected')
    })
    socket.on('get_v', () => {
        console.log('client')
        // io.sockets.emit('send_v', 'hello from server')
    })
})

generateHashPassForAdmin()

server.listen(PORT, () => console.log(`Server is up at port ${PORT}...`))
