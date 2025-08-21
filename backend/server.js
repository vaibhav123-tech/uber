const http = require('http');
const app = require('./app');
const port =  3001;
require("dotenv").config();

const {connecttomongo}=require('./db/db');
const {initializeSocket} =require('./socket')

const server = http.createServer(app);

initializeSocket(server);

connecttomongo(process.env.MONGO_URI).then(() => console.log('connected'));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

