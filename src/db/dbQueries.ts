import {appDb} from './appDb'
import {hash, compare} from 'bcrypt'
import {IVacation} from "../models/vacationModel"
import {IUser} from "../models/userModel"
import { adminPassword } from '../server'

//----------------------------------- user queries --------------------------------------------------
export async function generateHashPassForAdmin() {
    const hashPassAdmin = await hash(adminPassword, 10)
    await appDb.execute('UPDATE users SET password = ? WHERE userName = ? ', [hashPassAdmin, 'admin'])
}

//------- check user exist
export async function checkUserExists(userName: IUser):Promise<any> {
    const [userId] = await appDb.execute('SELECT id FROM users WHERE userName = ?', [userName])
    return userId
}

//-------- add new user
export async function addUser({userName, firstName, lastName, password}:IUser): Promise<number> {
    const hashedPassword = await hash(password, 10)
    const [{insertId}]: any = await appDb.execute('INSERT INTO users (userName, firstName, lastName, password) VALUES (?,?,?,?)', [userName, firstName, lastName, hashedPassword])
    return insertId
}

//-------- logIn
export async function logIn({userName, password}: IUser):Promise<number | null> {
    const [users]: any[] = await appDb.execute('SELECT id, password FROM users WHERE userName = ?', [userName])

    if (users.length === 0) {
        return null
    }
    const {id, password: hashedPassword} = users[0]
    const isPassCorrect = await compare(password, hashedPassword)

    if (!isPassCorrect) {
        return null
    }
    return id
}

//------------------------------------ vacation queries ---------------------------------------
//---- get list of all vacations
export async function getVacation(): Promise<any> {
    const [rows] = await appDb.execute('SELECT * FROM vacations')
    return rows
}

//----- follow vacation
export async function markFollow(userId: number, vacationId: number): Promise<boolean> {
    const [followId]: any[] = await appDb.execute('SELECT id from follow WHERE userId = ? AND vacationId = ?', [userId, vacationId])

    if (followId.length) {
        const [result]: any = await appDb.execute('DELETE FROM follow WHERE vacationId = ? and userId = ?', [vacationId, userId])
        await appDb.execute('UPDATE vacations SET countFollowers = countFollowers - 1 WHERE id = ?', [vacationId])
        return result.affectedRows > 0
    } else {
        const [{insertId}]: any = await appDb.execute('INSERT INTO follow (vacationId, userId, follow) VALUES (?, ?, true)', [vacationId, userId])
        await appDb.execute('UPDATE vacations SET countFollowers = countFollowers + 1 WHERE id = ?', [vacationId])
        return insertId
    }
}

//---- add new vacation
export async function addVacation({name, description, fromDate, toDate, picUrl, price}: IVacation): Promise<number> {
    const [{insertId}]: any = await appDb
        .execute('INSERT INTO vacations (name, descript, fromDate, toDate, pictureUrl, price) VALUES (?,?,?,?,?,?)', [name, description, fromDate, toDate, picUrl, price])
    return insertId
}

//----- edit vacation
export async function editVacation({id, name, description, fromDate, toDate, picUrl, price}: IVacation): Promise<boolean> {
    const [result]: any = await appDb
        .execute('UPDATE vacations SET name = ?, descript = ?, fromDate = ?, toDate = ?, pictureUrl = ?, price = ? WHERE id = ?', [name, description, fromDate, toDate, picUrl, price, id])
    return result.affectedRows > 0
}

//---- delete vacation
export async function deleteVacation(id: IVacation):Promise<boolean[]> {
    const [result]: any = await appDb.execute('DELETE FROM vacations WHERE id = ?', [id])
    const [result2]: any = await appDb.execute('DELETE FROM follow WHERE vacationId = ?', [id])
    return [result.affectedRows > 0, result2.affectedRows > 0]
}