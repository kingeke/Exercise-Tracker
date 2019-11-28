const required = (name, value, res) => {
    if (!value) {
        return res.json({
            error: `${name} is required`
        })
    }
}

const date = (date, res) => {

    if (date) {
        var dateData = new Date(date)

        if (dateData == 'Invalid Date') {
            return res.json({ error: 'Invalid date passed' })
        }
    }
}

module.exports = {
    required,
    date
}