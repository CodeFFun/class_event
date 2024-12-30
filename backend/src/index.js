const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const router = require('./routes/index.js');

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(cors())

const port = process.env.PORT || 8080;

app.use('/', router);

app.use('/v1/api', (_,res) => {
    res.send('V-0.0.1');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})