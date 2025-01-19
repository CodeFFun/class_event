const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/index.js');
const cookieParser = require('cookie-parser');
const path = require('path');

dotenv.config();

const app = express();

app.use(express.static(path.join(__dirname, '../public')));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors())


app.use('/',router);


app.use('/v1/api', (_,res) => {
    res.send('V-0.0.1');
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})