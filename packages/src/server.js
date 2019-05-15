const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet')

const app = express();
const signUp = require('./routes/signUp');
const login = require('./routes/login');
const checkList = require('./routes/checkList');
const user = require('./routes/user');
const teams = require('./routes/teams');
const share = require('./routes/shareList');
const config = require('./config');

var port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on PORT ${port}`));

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@owlportal-mqpuu.gcp.mongodb.net/test?retryWrites=true`, {useNewUrlParser:true})
    .then(()=> console.log("Connected to MongoDB Atlas!"))
    .catch((err)=> console.log("Error", err))

app.use(helmet());
app.use(express.json());

app.use('/register', signUp);
app.use('/login', login);
app.use('/checklist', checkList);
app.use('/user', user);
app.use('/teams', teams);
app.use('/share', share);
