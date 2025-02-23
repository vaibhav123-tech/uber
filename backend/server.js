const http = require('http');
const app = require('./app');
const port =  3000;
const {connecttomongo}=require('./db/db');

const server = http.createServer(app);

connecttomongo('mongodb://localhost:27017/uber').then(() => console.log('connected'));

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});