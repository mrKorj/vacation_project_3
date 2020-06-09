import {Router} from 'express'
import {addUser, checkUserExists, logIn} from "../dbQueries"
import {IUser} from "../models/userModel"
import {userSchema} from "../schemas/userSchema"
import Jwt from 'jsonwebtoken'
import {SECRET} from '../secret'

const router = Router()

//----- register new user
router.post('/register', async (req, res) => {
    try {
        const {userName, firstName, lastName, password} = req.body
        const {error} = userSchema.validate({userName, firstName, lastName, password})

        if (error) {
            res.status(400).send(error.details[0].message)
            return
        }

        const user = await checkUserExists(userName)

        if (user.length) {
            res.status(401).send({message: 'User already exists'});
            return;
        }

        const userId = await addUser({userName, firstName, lastName, password} as IUser)
        const token = Jwt.sign({userName, userId}, SECRET, {expiresIn: '1h'})

        res.send({userId, token, message: `Welcome ${userName}`})
    } catch (e) {
        res.status(500).send(e)
    }

})

//--------- logIn
router.post('/login', async (req, res) => {
    try {
        const {userName, password} = req.body
        const userId = await logIn({userName, password} as IUser)

        if (!userId.length) {
            res.status(401).send({message: 'Username and password don\'t match.'})
            return
        }

        const token = Jwt.sign({userName, userId}, SECRET, {expiresIn: '1h'})
        res.send({token, userName, message: `Welcome ${userName}`});
    } catch (e) {
        res.status(500).send(e)
    }

})


export {router as authRouter}
