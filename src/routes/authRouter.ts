import {Router} from 'express'
import {addUser} from "../dbQueries";

const router = Router()

router.post('/register', async (req, res) => {
    const {userName, firstName, lastName, password} = req.body
    const userId = await addUser(userName, firstName, lastName, password)
    res.send({userId})
})



export {router as authRouter}
