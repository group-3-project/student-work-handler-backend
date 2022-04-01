const express =require('express');
const app = express();
const mongoose = require("mongoose");
const UserRouter=require("./api/user");
const classroomRoutes=require('./api/classroom')
const cors=require('cors');
var bodyParser = require('body-parser')
require('dotenv').config();

// mongoose connection
mongoose
  .connect(`mongodb+srv://minorgroup:group3@studentworkhandlerclust.j915q.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
      {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  });



  
app.use(cors());
  //for accepting post form data
  app.use(
    express.urlencoded({ extended: true })
);
  app.use(bodyParser.json())
  app.use('/user',UserRouter)
  app.use('/classrooms', classroomRoutes);




//server listen 
const port = process.env.PORT || 3001;
app.listen(port,()=>{
    console.log("Server runing on 3001 port number");
})  