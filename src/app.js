const express = require('express');
const port = 3000;

const app = express(); 

const indexRouter = require('./routes/index.js');
const clientsRouter = require('./routes/clients.js');
const clientsHistoryRouter = require('./routes/clients_history.js');

const cron = require('./services/cronPing');
cron;

app.use(express.json());

app.use('/api/', indexRouter);
app.use('/api/clients/', clientsRouter);
app.use('/api/clients/history/', clientsHistoryRouter);

// app.use((req, res, error, next) => {
//     // next(createError(404));
//     res.send("404");
// })

app.listen(port, () => {
    console.log(`IPUPTIMESCANNER is active on http://localhost:${port}`);
})