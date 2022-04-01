import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import classroomRoutes from './routes/classroom.js';

const app = express();

app.use(cors());

app.use(bodyParser.json({ limit: "20mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));

app.use('/classrooms', classroomRoutes);

//const CONNECTION_URL = 'mongodb+srv://Aliasgar:5253@cluster0.yuolp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const CONNECTION_URL = "mongodb+srv://minorgroup:group3@studentworkhandlerclust.j915q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => app.listen(PORT, () =>
    console.log(`Connection is established and running on port: ${PORT}`)
)).catch((err) => console.log(err.message));