import {Router} from 'express'

const router = Router()

//-------- user authentication
router.post('/', async (req, res) => {
    const {userName, userId} = (req as any).user // from express-jwt middleware

    if(userName === 'admin') {
        res.send({userName, userRole: 'admin'})
        return
    }

    res.send({userId, userName, userRole: 'registeredUser'})
})

export {router as authenticationRouter}