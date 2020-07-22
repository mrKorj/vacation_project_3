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
        let {userName, firstName, lastName, password} = req.body as IUser
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
        const token = Jwt.sign({userName, userId}, SECRET, {expiresIn: 60 * 60})

        res.send({userId, userRole: 'registeredUser', userName, token, message: `Welcome ${userName}`})
    } catch (e) {
        res.status(500).send(e)
    }

})

//--------- logIn
router.post('/login', async (req, res) => {
    try {
        let {userName, password} = req.body as IUser
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
        const token = Jwt.sign({userName, userId}, SECRET, {expiresIn: 60 * 60})

        if (userName === 'admin') {
            res.send({userRole: 'admin', token, userName, message: `Welcome ${userName}`})
            return
        }

        res.send({userId, userRole: 'registeredUser', token, userName, message: `Welcome ${userName}`});
    } catch (e) {
        res.status(500).send(e)
    }

})


export {router as authorizationRouter}
