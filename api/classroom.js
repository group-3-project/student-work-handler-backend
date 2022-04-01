const express =require('express');
const { getClassrooms, createClassroom, deleteClassroom, searchCode } =require("../controllers/classroom")

const router = express.Router();

router.get('/', getClassrooms);
router.post('/', createClassroom);
router.post('/searchcode', searchCode);
router.delete('/:id', deleteClassroom);

module.exports = router;
