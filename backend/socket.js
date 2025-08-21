const socketIo =require('socket.io')
const userModel =require('./models/user_model');
const captainModel=require('./models/captain_model')
 let io;

 function initializeSocket(server){
    io=socketIo(server,{
        cors:{
            origin: [
                "https://uber-flt7prdoy-vaibhav-aroras-projects-3cd4dc08.vercel.app", 
                "http://localhost:5173" 
            ],
            methods:['GET','POST']
        }
    });
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);
        socket.on('join' , async (data) => {
            const { userId, userType } = data;

            if (userType === 'user') {
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain') {
                await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });

        socket.on('update-location-captain',async (data)=>{
            const { userId, location } = data;
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
            await captainModel.findByIdAndUpdate(userId, {
                location: {
                    ltd: location.ltd,
                    lng: location.lng
                }})
        })
        
    }
 )}
 const sendMessageToSocketId = (socketId, messageObject) => {

    console.log(messageObject);
    
        if (io) {
            io.to(socketId).emit(messageObject.event, messageObject.data);
        } else {
            console.log('Socket.io not initialized.');
        }
    }
 module.exports={initializeSocket,sendMessageToSocketId}