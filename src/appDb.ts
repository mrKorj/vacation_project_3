import {createPool} from 'mysql2/promise'
// import * as mysql from 'mysql2/promise';


export const appDb = createPool({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'appDB'
})
