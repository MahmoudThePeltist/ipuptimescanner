const express = require('express');
const cors = require('cors');
const port = 3500;

const app = express(); 

const generalRouter = require('./routes/general.routes.js');
const clientsRouter = require('./routes/clients.routes.js');
const historyRouter = require('./routes/history.routes.js');

const cron = require('./services/cronPing');
cron;

app.use(cors());
app.use(express.json());

app.use('/api/', generalRouter);
app.use('/api/clients/', clientsRouter);
app.use('/api/history/', historyRouter);

// app.use((req, res, error, next) => {
//     // next(createError(404));
//     res.send("404");
// })

app.listen(port, () => {
    console.log(`IPUPTIMESCANNER is active on http://localhost:${port}`);
})