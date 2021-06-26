const Database = require('./config')
const initDB = {
    async init() {
        const db = await Database()

        // await db.exec(`DROP TABLE rooms`)
        // await db.exec(`DROP TABLE questions`)

        await db.exec(`CREATE TABLE rooms (id INTEGER PRIMARY KEY, pass TEXT)`)
        await db.exec(
            `CREATE TABLE questions (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT, read INT, room INT)`,
        )
        await db.close()
    },
}

initDB.init()
