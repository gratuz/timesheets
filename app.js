import express from 'express';
import dotenv from 'dotenv';

import jwtCheck from './lib/auth0';

import Timesheet from './lib/timesheet';
import DB from './lib/db';

//routes
import UserRoutes from './routes/users';
import ProjectRoutes from './routes/projects';
import RecordRoutes from './routes/records';


const PORT = process.env.PORT || 5000;;

// Set up the express app
const app = express();
// parse application/json
app.use(express.json());


if(process.env.NODE_ENV == 'local') dotenv.config();


const db = new DB({host:process.env.HOST,database:process.env.DB,password:process.env.PASSWORD,username:process.env.USERNAME});
const timesheet = new Timesheet(db);


//basic health check
app.get('/health', (req,res) => {
  
  let serverstatus = 'up';
  let dbstatus = 'down';
  db.execute({query:'SELECT 1'})
  .then(r=>{
    dbstatus = 'up';
    res.status(200).send({
      server: serverstatus,
      db: dbstatus,
    });  
  })
  .catch(e=>{
    res.status(200).send({
      server: serverstatus,
      db: dbstatus,
    });  
  })
});


//routing
const protectedRoutes = express.Router();
protectedRoutes.use(jwtCheck);
app.use('/api',protectedRoutes);

app.use('/api/v1/users',UserRoutes(timesheet));
app.use('/api/v1/projects',ProjectRoutes(timesheet));
app.use('/api/v1/records',RecordRoutes(timesheet));














app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
