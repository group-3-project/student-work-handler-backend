const mongoose = require("mongoose");
const shortid =require('shortid');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const classroomSchema = mongoose.Schema({
    classroomName: String,
    code: {
        type: String,
        default: shortid.generate
    },
    classroomOwner: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true,
    }
    
    
});

const classRoomModel = mongoose.model('classroomLists',classroomSchema);
module.exports =classRoomModel;
