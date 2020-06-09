import {appDb} from './appDb'
import {IVacation} from "./models/vacationModel"
import {IUser} from "./models/userModel"

//----------------------------------- user queries --------------------------------------------------

//------- check user exist
export async function checkUserExists(userName: IUser):Promise<any> {
    const [userId] = await appDb.execute('SELECT id FROM users WHERE userName = ?', [userName])
    return userId
}

//-------- add new user
export async function addUser({userName, firstName, lastName, password}:IUser): Promise<number> {
    const [{insertId}]: any = await appDb.execute('INSERT INTO users (userName, firstName, lastName, password) VALUES (?,?,?,?)', [userName, firstName, lastName, password])
    return insertId
}

//-------- logIn
export async function logIn({userName, password}: IUser):Promise<any> {
    const [userId] = await appDb.execute('SELECT id FROM users WHERE userName = ? AND password = ?', [userName, password])
    return userId
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
        const [result]: any = await appDb.execute('UPDATE follow SET follow = NOT follow WHERE vacationId = ? and userId = ?', [vacationId, userId])
        const [res]: any= await appDb.execute('SELECT follow FROM follow WHERE vacationId = ? AND userId = ?', [vacationId, userId])

        const val = res[0].follow
        if (val) {
            await appDb.execute('UPDATE vacations SET countFollowers = countFollowers + 1 WHERE id = ?', [vacationId])
        } else {
            await appDb.execute('UPDATE vacations SET countFollowers = countFollowers - 1 WHERE id = ?', [vacationId])
        }

        return result.affectedRows > 0
    } else {
        const [{insertId}]: any = await appDb.execute('INSERT INTO follow (vacationId, userId, follow) VALUES (?, ?, true)', [vacationId, userId])
        await appDb.execute('UPDATE vacations SET countFollowers = countFollowers + 1 WHERE id = ?', [vacationId])
        return insertId
    }
}

//---- add new vacation
export async function addVacation({name, description, beginDate, expDate, picUrl, price}: IVacation): Promise<number> {
    const [{insertId}]: any = await appDb
        .execute('INSERT INTO vacations (name, descript, beginDate, expDate, pictureUrl, price) VALUES (?,?,?,?,?,?)', [name, description, beginDate, expDate, picUrl, price])
    return insertId
}

//----- edit vacation
export async function editVacation({id, name, description, beginDate, expDate, picUrl, price}: IVacation): Promise<boolean> {
    const [result]: any = await appDb
        .execute('UPDATE vacations SET name = ?, descript = ?, beginDate = ?, expDate = ?, pictureUrl = ?, price = ? WHERE id = ?', [name, description, beginDate, expDate, picUrl, price, id])
    return result.affectedRows > 0
}

//---- delete vacation
export async function deleteVacation(id: IVacation):Promise<boolean[]> {
    const [result]: any = await appDb.execute('DELETE FROM vacations WHERE id = ?', [id])
    const [result2]: any = await appDb.execute('DELETE FROM follow WHERE vacationId = ?', [id])
    return [result.affectedRows > 0, result2.affectedRows > 0]
}
