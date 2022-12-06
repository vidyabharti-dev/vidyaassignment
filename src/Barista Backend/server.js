
const express = require('express');
const bodyParser = require('body-parser');    ///copied

const app = express();
const fs = require('fs');  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const payment = require('./routes/paymentsrouter.js')(app,fs);
const prices = require('./routes/pricesrouter')(app,fs);
const orders = require('./routes/ordersrouter')(app,fs);
const customers = require('./routes/customersrouter')(app,fs);  
const menu = require('./routes/menurouter')(app,fs);  
app.listen(3000, () => {
    console.log("listening on http://localhost:3000");
});
