const mongoose = require("mongoose");
const shortid =require('shortid');

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const classroomSchema = mongoose.Schema({
    classroomName: String,
    code: {
        type: String,
        default: shortid.generate
    },
    
});

const classRoomModel = mongoose.model('classroomLists',classroomSchema);
module.exports =classRoomModel;
