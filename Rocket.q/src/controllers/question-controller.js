module.exports = {
    index(req, res) {
        const roomId = req.params.id
        const questionId = req.params.question
        const actionType = req.params.action
        const passwd = req.body.passwd

        console.log(
            `roomId: ${roomId}\nquestionId: ${questionId}\nactionType: ${actionType}\n passwd: ${passwd}`,
        )
    },
}
