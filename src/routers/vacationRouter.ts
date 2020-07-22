import {Router} from 'express';
import fs from 'fs';
import {addVacation, deleteVacation, editVacation, getCountFollowers, getVacation, likeVacation, markFollow} from "../db/dbQueries"
import {IVacation} from "../models/vacationModel";
import {vacationSchema} from "../schemas/vacationSchema";
import {adminSocket, rootPath} from "../server";

const router = Router()

// -------- get all vacations
router.get('/', async (req, res) => {
    const {userId} = (req as any).user // from express-jwt middleware

    try {
        const vacations = await getVacation(userId)
        res.send(vacations);
    } catch (e) {
        res.status(500).send(e)
    }
})

//--------- toggle follow vacation
router.put('/follow', async (req, res) => {
    try {
        const {userName, userId} = (req as any).user  // from express-jwt middleware
        if (userName === 'admin') {
            res.status(400).send({message: `user '${userName}' doesn't have permission`})
            return
        }
        const io = (req as any).io
        const {vacationId} = req.body

        await markFollow(userId, vacationId)

        const [{countFollowers}]: any = await getCountFollowers(vacationId)

        io.to(adminSocket.id).emit('followActionClient', {vacationId, type: 'FOLLOW', countFollowers})

        res.send({message: 'toggle successes'})

    } catch (e) {
        res.status(500).send(e)
    }

})

//--------- add vacation
router.post('/add', (req, res) => {

    try {
        const {userName} = (req as any).user // from express-jwt middleware
        if (userName !== 'admin') {
            res.status(400).send({message: `user '${userName}' doesn't have permission`})
            return
        }

        const {form} = req.body
        const {name, description, fromDate, toDate, price}: IVacation = JSON.parse(form)

        if (!req.files) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            });
        }

        const sampleFile = req.files.sampleFile

        // @ts-ignore
        sampleFile.mv('upload/' + sampleFile.name, async function (err) {
            if (err) {
                return res.status(500).send({err, message: 'mv file error'})
            }

            // @ts-ignore
            const picUrl = `upload/${sampleFile.name}`

            const {error} = vacationSchema.validate({name, description, fromDate, toDate, picUrl, price})
            if (error) {
                res.status(400).send({message: error.details[0].message})
                console.log(error.details[0].message)
                return
            }
            const newVacation = await addVacation({name, description, fromDate, toDate, picUrl, price} as IVacation)

            res.send({message: 'vacation add successfully', newVacation})

            // @ts-ignore
            adminSocket.socket.broadcast.emit('addNewVacation', newVacation)
        })

    } catch (e) {
        res.status(500).send(e)
    }
})


//----------- edit vacation
router.put('/edit', async (req, res) => {

    try {
        const {userName} = (req as any).user // from express-jwt middleware
        if (userName !== 'admin') {
            res.status(400).send({message: `user '${userName}' doesn't have permission`})
            return
        }

        const {form} = req.body
        const {id, name, description, fromDate, toDate, price}: IVacation = JSON.parse(form)
        const {error} = vacationSchema.validate({name, description, fromDate, toDate, price})

        if (error) {
            res.status(400).send({message: error.details[0].message})
            return
        }

        if (!req.files) {
            const editedVacation = await editVacation({id, name, description, fromDate, toDate, price} as IVacation)

            // @ts-ignore
            adminSocket.socket.broadcast.emit('editVacation', editedVacation)

            res.send({message: 'vacation updated successfully', editedVacation})
            return
        }

        const sampleFile = req.files.sampleFile

        // @ts-ignore
        sampleFile.mv('upload/' + sampleFile.name, async function (err) {
            if (err) {
                return res.status(500).send({err, message: 'mv file error'})
            }

            // @ts-ignore
            const picUrl = `upload/${sampleFile.name}`

            const editedVacation = await editVacation({id, name, description, fromDate, picUrl, toDate, price} as IVacation)

            // @ts-ignore
            adminSocket.socket.broadcast.emit('editVacation', editedVacation)

            res.send({message: 'vacation updated successfully', editedVacation})

        })

    } catch (e) {
        res.status(500).send(e)
    }
})

//---------- delete vacation
router.delete('/delete', async (req, res) => {
    try {
        const {userName} = (req as any).user // from express-jwt middleware
        if (userName !== 'admin') {
            res.status(400).send({message: `user '${userName}' doesn't have permission`})
            return
        }

        const {vacationId} = req.body
        const result = await deleteVacation(vacationId)
        const {pictureUrl}: any = result[2]

        if (result[0]) {
            // @ts-ignore
            adminSocket.socket.broadcast.emit('deleteAction', vacationId)
        }

        fs.unlink(`${rootPath}${pictureUrl}`, (err) => {
            if (err) console.log(err);
            console.log(`${pictureUrl} was deleted`);
        });

        res.send({message: 'vacation deleted successfully', result})
    } catch (e) {
        res.status(500).send(e)
    }
})

//--------- like vacation
router.put('/like', async (req, res) => {
    try {
        const {userName} = (req as any).user  // from express-jwt middleware
        if (userName === 'admin') {
            res.status(400).send({message: `user '${userName}' doesn't have permission`})
            return
        }

        const io = (req as any).io
        const {vacationId} = req.body
        await likeVacation(vacationId)

        res.send({message: 'like successes'})

        io.to(adminSocket.id).emit('likeActionClient', vacationId)
    } catch (e) {
        res.status(500).send(e)
    }
})

export {router as vacationRouter}
