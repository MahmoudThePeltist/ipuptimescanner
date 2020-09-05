const express = require('express');
const app = express();
const port = 3000;

const indexRouter = require('./routes/index.js')

app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Test app listening on http://localhost:${port}`);
})