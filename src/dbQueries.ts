import {appDb} from './appDb'
import {IVacation} from "./models/vacation";


export async function addUser(userName: string, firstName: string, lastName: string, password: string): Promise<number> {
    const [{insertId}]: any = await appDb.execute('INSERT INTO users (userName, firstName, lastName, password) VALUES (?,?,?,?)', [userName, firstName, lastName, password])
    return insertId
}


export async function getVacation(): Promise<any> {
    const [rows] = await appDb.execute('SELECT * FROM vacations')
    return rows
}


export async function markFollow(userId: number, vacationId: number): Promise<any> {
    const [followId]: any[] = await appDb.execute('select id from follow where userId = ? and vacationId = ?', [userId, vacationId])

    if (followId.length) {
        const [result]: any = await appDb.execute('update follow set follow = NOT follow where vacationId = ? and userId = ?', [vacationId, userId])
        return result.affectedRows > 0;
    } else {
        const [{insertId}]: any = await appDb.execute('INSERT INTO follow (vacationId, userId, follow) VALUES (?, ?, true)', [vacationId, userId])
        return insertId
    }
}


export async function addVacation({name, description, beginDate, expDate, picUrl, price}: IVacation): Promise<any> {
    const [{insertId}]: any = await appDb
        .execute('INSERT INTO vacations (name, descript, beginDate, expDate, pictureUrl, price) VALUES (?,?,?,?,?,?)', [name, description, beginDate, expDate, picUrl, price])
    return insertId
}


export async function editVacation({id, name, description, beginDate, expDate, picUrl, price}: IVacation): Promise<any> {
    const [result]: any = await appDb
        .execute('UPDATE vacations SET name = ?, descript = ?, beginDate = ?, expDate = ?, pictureUrl = ?, price = ? WHERE id = ?', [name, description, beginDate, expDate, picUrl, price, id])
    return result.affectedRows > 0
}

export async function deleteVacation(id: IVacation) {
    const [result]: any = await appDb.execute('DELETE FROM vacations WHERE id = ?', [id])
    const [result2]: any = await appDb.execute('DELETE FROM follow WHERE vacationId = ?', [id])
    return [result.affectedRows > 0, result2.affectedRows > 0]
}
