import classroomModel from '../models/classroom.js';

export const getClassrooms = async (req, res) => {
    try {
        const allClassrooms = await classroomModel.find();
        res.status(200).json(allClassrooms);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}

export const searchCode = async (req, res) => {
    console.log("Received code: ", req.body.code);
    try {
        let code = await classroomModel.findOne({ code: req.body.code })

        if (code == null) {
            console.log("No classroom exists with such code!");
            res.status(404).json({ message: "not found" });
        }
        else {
            console.log("Found: ", code);
            res.status(200).json(code);
        }
    }
    catch (error) {
        console.log(error);
        res.status(500);
    }
}

export const createClassroom = async (req, res) => {
    const classroom = req.body;
    const newClassroom = new classroomModel(classroom);

    try {
        await newClassroom.save();
        res.status(201).json(newClassroom);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteClassroom = async (req, res) => {
    const id = req.params.id;

    try {
        await classroomModel.findByIdAndDelete(id).exec();
        res.send('Successfully Deleted!')
    } catch (error) {
        console.log(error);
    }
}