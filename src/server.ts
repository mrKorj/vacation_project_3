import express from 'express'
import {vacationRouter} from "./routes/vacationRouter"
import {authRouter} from "./routes/authRouter"
import expressJwt from 'express-jwt'
import {SECRET} from './secret'

const PORT = 4000;

const app = express()
app.use(express.json())

// app.use(expressJwt({secret: SECRET}).unless({path: new RegExp('/api/auth.*/', 'i')}))

app.use('/api', vacationRouter)
app.use('/api/auth', authRouter)


app.listen(PORT, () => console.log(`Server is up at port ${PORT}...`))
