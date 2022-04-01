import mongoose from 'mongoose';
import shortid from 'shortid';

shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');

const classroomSchema = mongoose.Schema({
    classroomName: String,
    code: {
        type: String,
        default: shortid.generate
    },
    
});

const classRoomModel = mongoose.model('classroomLists', classroomSchema)

export default classRoomModel;