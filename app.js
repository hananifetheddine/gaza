const express = require('express');
const path = require('path');
const bodyParser = require('body-parser')
const app = express( );
const indexRouter = require('./routes/index_routes')

app.use('/api/user/donation/hook', bodyParser.raw({ type: '*/*' }))
app.use(express.json()) ;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api',indexRouter);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});



