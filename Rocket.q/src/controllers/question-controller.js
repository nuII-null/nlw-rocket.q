const Database = require('../db/config')

module.exports = {
    async index(req, res) {
        const db = await Database()
        const roomId = req.params.id
        const questionId = req.params.question
        const actionType = req.params.action
        const passwd = req.body.passwd
        const roomData = await db.get(`SELECT * FROM rooms WHERE id=${roomId}`)

        if (roomData.pass == passwd) {
            if (actionType == 'delete') {
                await db.run(`DELETE FROM questions WHERE id=${questionId}`)
            } else if (actionType == 'check') {
                await db.run(`UPDATE questions SET read = 1 WHERE id=${questionId}`)
            }
            res.redirect(`/room/${roomId}`)
        } else {
            res.render('passincorrect', {roomId})
        }

    },
    async create(req, res) {
        const db = await Database()
        const question = req.body.question
        const roomId = req.params.room

        await db.run(`INSERT INTO questions (
            content,
            room,
            read
            ) VALUES (
                '${question}',
                ${parseInt(roomId)},
                0 
            )`)
        await db.close()

        res.redirect(`/room/${roomId}`)
    }
}
