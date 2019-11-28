const User = require('../models/User')
const ValidationController = require('../controllers/ValidationController')

const idGenerator = () => {
    return Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2);
}

const findUser = (req, res, next) => {
    User.findOne({ id: req.body.userId || req.params.userId || req.query.userId }).then((user) => {
        if (!user) {
            return res.json({
                error: 'User does not exist'
            })
        }
        req.user = user
        return next()
    }).catch((err) => {
        return res.json({
            error: 'User does not exist'
        })
    })
}

const users = (req, res) => {
    User.find().then((users) => {
        res.json(users)
    }).catch((err) => {
        res.json({
            error: err.message
        })
    })
}

const create = (req, res) => {

    const { username } = req.body

    ValidationController.required('Username', username, res)

    var id = idGenerator()

    User.findOne({ username }).then((user) => {
        if (user) {
            return res.json({ error: 'username already taken', userId: user.id })
        }
        else {
            new User({
                username,
                id
            }).save().then((user) => {
                return res.json({
                    username: user.username,
                    _id: user.id
                })
            }).catch((err) => {
                return res.json({ error: err.message })
            })
        }
    }).catch((err) => {
        return res.json({ error: err.message })
    })
}

module.exports = {
    create,
    users,
    findUser
}