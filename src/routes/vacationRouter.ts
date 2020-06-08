import {Router} from 'express'
import {addVacation, deleteVacation, editVacation, getVacation, markFollow} from "../dbQueries"
import {IVacation} from "../models/vacation";
import {vacationSchema} from "../schemas/vacationSchema";

const router = Router()


// -------- get all vacations
router.get('/', async (req, res) => {
    try {
        const vacations = await getVacation()
        res.send({vacations});
    } catch (e) {
        res.status(500).send(e)
    }

})

//--------- toggle follow vacation
router.put('/', async (req, res) => {
    try {
        const {userId, vacationId} = req.body
        const followId = await markFollow(userId, vacationId)
        res.send({message: 'toggle successes', followId})
    } catch (e) {
        res.status(500).send(e)
    }

})

//--------- add vacation
router.post('/', async (req, res) => {

    try {
        const {name, description, beginDate, expDate, picUrl, price}: IVacation = req.body
        const {error} = vacationSchema.validate({name, description, beginDate, expDate, picUrl, price})
        if (error) {
            res.status(400).send(error)
            return
        }
        const vacationId = await addVacation({name, description, beginDate, expDate, picUrl, price} as IVacation)
        res.send({message: 'vacation add successfully', vacationId})
    } catch (e) {
        res.status(500).send(e)
    }
})


//----------- edit vacation
router.put('/edit', async (req, res) => {

    try {
        const {id, name, description, beginDate, expDate, picUrl, price}: IVacation = req.body
        const {error} = vacationSchema.validate({name, description, beginDate, expDate, picUrl, price})
        if (error) {
            res.status(400).send(error)
            return
        }
        const vacationUpdate = await editVacation({id, name, description, beginDate, expDate, picUrl, price} as IVacation)
        res.send({message: 'vacation updated successfully', vacationUpdate})
    } catch (e) {
        res.status(500).send(e)
    }
})

//---------- delete vacation
router.delete('/', async (req, res) => {
    try {
        const {id} = req.body
        const result = await deleteVacation(id)
        res.send({message: 'vacation deleted successfully', result})
    } catch (e) {
        res.status(500).send(e)
    }
})

export {router as vacationRouter}
