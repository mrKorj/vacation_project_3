import {Router} from 'express'
import {addUser, checkUserExists, logIn} from "../db/dbQueries"
import {IUser} from "../models/userModel"
import {logInSchema, newUserSchema} from "../schemas/userSchema"
import Jwt from 'jsonwebtoken'
import {SECRET} from '../server'

const router = Router()

//----- register new user
router.post('/register', async (req, res) => {
    try {
        // TODO: userName declaration !!!
        let {userName, firstName, lastName, password} = req.body
        userName = userName.toLowerCase()
        const {error} = newUserSchema.validate({userName, firstName, lastName, password})

        if (error) {
            const message = error.details[0].message
            res.status(400).send({message})
            return
        }

        const user = await checkUserExists(userName)

        if (user.length) {
            res.status(401).send({message: 'User already exists'});
            return;
        }

        const userId = await addUser({userName, firstName, lastName, password} as IUser)
        const token = Jwt.sign({userName, userId}, SECRET)

        res.send({userId, token, message: `Welcome ${userName}`})
    } catch (e) {
        res.status(500).send(e)
    }

})

//--------- logIn
router.post('/login', async (req, res) => {
    try {
        // TODO: userName declaration !!!
        let {userName, password} = req.body
        userName = userName.toLowerCase()
        const {error} = logInSchema.validate({userName, password})

        if (error) {
            const message = error.details[0].message
            res.status(400).send({message})
            return
        }

        const userId = await logIn({userName, password} as IUser)

        if (!userId) {
            res.status(401).send({message: 'Username and password don\'t match.'})
            return
        }

        const token = Jwt.sign({userName, userId}, SECRET)
        res.send({token, userName, message: `Welcome ${userName}`});
    } catch (e) {
        res.status(500).send(e)
    }

})


export {router as authRouter}
