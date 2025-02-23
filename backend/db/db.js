const mongoose=require('mongoose');
const connecttomongo=(url)=>{
    return mongoose.connect(url);
}
module.exports={connecttomongo};