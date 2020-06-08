import express from 'express';
import {vacationRouter} from "./routes/vacationRouter";
import {authRouter} from "./routes/authRouter";

const PORT = 4000;

const {JWT_SECRET = 'secret'} = process.env;

const app = express();
app.use(express.json())

// comment out this line if you want to bypass JWT check during development
// app.use(expressJwt({secret: JWT_SECRET}).unless({path: '/'}));

app.use('/api/', vacationRouter)
app.use('/api/auth/', authRouter)


app.listen(PORT, () => console.log(`Server is up at port ${PORT}...`));
