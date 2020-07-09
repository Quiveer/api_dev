const express = require ('express');
const app = express();
const PORT = process.env.PORT || 8000;

app.use('/', require('./routes/index'));

app.listen(PORT, console.log(`api_dev started on port ${PORT}`));
