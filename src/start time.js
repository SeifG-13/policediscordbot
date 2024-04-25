const {Schema,model}= require('mongoose')
const startTime = new Schema({
    userId:{
        type : String,
        required : true
    },
    timeId :{
        type : Date,
        default : new Date()
    }

})
module.exports = model('time', startTime)