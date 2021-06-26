const Database = require('../db/config')

module.exports = {
    async create(req, res) {
        const db = await Database()
        const pass = req.body.roomPass
        let doesExist = true
        let roomId
        
        while (doesExist) {
            
            
            for (let i = 0; i < 6; i++) {
                i == 0 ? roomId = Math.floor(Math.random() * 10).toString() : roomId += Math.floor(Math.random() * 10).toString()
            }
    
            const existentIds = await db.all(`SELECT id FROM rooms`)
            doesExist = existentIds.some(id => id === roomId)
            if (!doesExist) {
                await db.run(
                    `INSERT INTO rooms (
                        id,
                        pass
                        ) VALUES (
                            ${roomId}, 
                            "${pass}"
                        )`,
                )
            }
        }

        await db.close()

        res.redirect(`/room/${roomId}`)
    },
    async open(req, res){
        const db = await Database()
        const roomId = req.params.room
        const questions = await db.all(`SELECT * FROM questions WHERE room=${roomId} and read=0`)
        const readQuestions = await db.all(`SELECT * FROM questions WHERE room=${roomId} and read=1`)
        let areThereNoQuestions

        if (questions.length == 0 && readQuestions.length == 0) {
            areThereNoQuestions = true
        }
        res.render('room', {
            roomId, 
            questions, 
            readQuestions,
            areThereNoQuestions
        })
    },
    enter(req, res){
        const roomId = req.body.roomId

        res.redirect(`/room/${roomId}`)
    }
}
