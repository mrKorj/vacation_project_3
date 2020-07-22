import express from 'express'
import expressJwt from 'express-jwt'
import socketIo from 'socket.io'
import http from 'http'
import path from 'path'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import {vacationRouter} from "./routers/vacationRouter"
import {authorizationRouter} from "./routers/authorizationRouter"
import {generateHashPassForAdmin} from "./db/dbQueries";
import {authenticationRouter} from "./routers/authenticationRouter";

export const rootPath = path.join(__dirname, '../')
const {PORT = 4000} = process.env;
export const {SECRET = 'secret'} = process.env;
export const {adminPassword = '12345'} = process.env
export const adminSocket = {id: '', socket: {}}

const app = express()
const server = http.createServer(app)
const io = socketIo(server)

app.use(cors())

app.use(express.json())

app.use(fileUpload({
    createParentPath: true,
    limits: {
        fileSize: 2 * 1024 * 1024 * 1024 //2MB max file(s) size
    },
}))

app.use(expressJwt({secret: SECRET}).unless({path: [new RegExp('/api/authorization.*/', 'i'), new RegExp('/upload.*/', 'i')]}))

app.use('/api', function (req, res, next) {
    (req as any).io = io
    next()
})

app.use('/upload', express.static('upload'))
app.use('/api', vacationRouter)
app.use('/api/authorization', authorizationRouter)
app.use('/api/authentication', authenticationRouter)

io.sockets.on('connection', (socket) => {
    console.log('io client connected')

    socket.on('adminSocketId', (id: string) => {
        adminSocket.id = id
        adminSocket.socket = socket
    })

    socket.on('disconnect', () => {

        if (adminSocket.id === socket.id) {
            adminSocket.id = ''
            adminSocket.socket = {}
        }

        console.log('io disconnected')
    })

})

generateHashPassForAdmin()

server.listen(PORT, () => console.log(`Server is up at port ${PORT}...`))
