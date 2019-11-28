const Exercise = require('../models/Exercise')
const ValidationController = require('../controllers/ValidationController')

const create = (req, res) => {

    const { userId, description, duration, date } = req.body

    ValidationController.required('userId', userId, res)
    ValidationController.required('description', description, res)
    ValidationController.required('duration', duration, res)
    ValidationController.date(date, res)

    new Exercise({ userId, description, duration, date: date || Date().toString() }).save().then((data) => {
        return res.json({
            _id: req.user.id,
            username: req.user.username,
            description: data.description,
            duration: data.duration,
            date: data.date,
        })
    }).catch((err) => res.json({ error: err.message }))
}

const log = (req, res) => {

    const { userId, from, to, limit } = req.query

    try {
        Exercise.find(
            {
                userId,
                date: {
                    $gte: new Date(from || '0001-01-01').toISOString(),
                    $lte: new Date(to || '9999-01-01').toISOString(),
                }
            }
        )
            .sort('from')
            .select('-_id -userId')
            .limit(parseInt(limit))
            .exec()
            .then((logs) => {
                return res.json({
                    _id: req.user.id,
                    username: req.user.username,
                    count: logs.length,
                    logs
                })
            })
            .catch((err) => res.json({ error: err.message }))
    }
    catch (e) {
        res.json({ error: e.message })
    }
}

module.exports = {
    create,
    log
}