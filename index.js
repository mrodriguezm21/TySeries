require('dotenv').config()
require('./utils/auth')
const cors = require('cors')


const {logErrors, errorHandler, boomErrorHandler} = require('./middlewares/error.handler')


const express = require("express");
const routerApi = require("./routes");


const app = express();
const config = require("./config");


const db = require("./db");
db(config.dbUrl)



app.use(express.json());
app.use(cors());

routerApi(app);
app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);



app.listen(config.port, () => {
    console.log(`Server is running on ${config.host}:${config.port}`);
});
