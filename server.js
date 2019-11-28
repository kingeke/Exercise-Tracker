var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var mongoose = require('mongoose')
const dotenv = require('dotenv')
var UserController = require('./controllers/UserController')
var ExerciseController = require('./controllers/ExerciseController')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static('./public'))

mongoose.connect(dotenv.config().parsed.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log('connected')
})

app.get('/', (req, res) => res.sendFile(__dirname + '/views/index.html'))

app.post('/api/exercise/new-user',
    UserController.create
)

app.get('/api/exercise/users',
    UserController.users
)

app.post('/api/exercise/add',
    UserController.findUser,
    ExerciseController.create
)

app.get('/api/exercise/log',
    UserController.findUser,
    ExerciseController.log
)

var listener = app.listen(process.env.PORT || 8000, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

// 99v40ee1mafueytiu5us5p