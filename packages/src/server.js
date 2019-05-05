const express = require('express');
const mongoose = require('mongoose');

const app = express();
const signUp = require('./routes/signUp');
const config = require('./config')


app.listen('3001', () => console.log('Listening on PORT 3001.'));

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@owlportal-mqpuu.gcp.mongodb.net/test?retryWrites=true`, {useNewUrlParser:true})
    .then(()=> console.log("Connected to MongoDB Atlas!"))
    .catch((err)=> console.log("Error", err))

app.use(express.json());

app.use('/users', signUp);

