const express = require('express');
const cors = require('cors');
require('./db/conn');
const app = express();
const router = require('./routes/router');


app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use(router)


const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
    console.log(`Application is listening on port ${PORT}!`)
);
