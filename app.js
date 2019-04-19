import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'express-jwt';
import jwks from 'jwks-rsa';
import dotenv from 'dotenv';

import Timesheet from './timesheet';
import DB from '././db';

// Set up the express app
const app = express();

// parse application/json
app.use(bodyParser.json())

if(process.env.NODE_ENV !== 'local'){
  //auth0
  const jwtCheck = jwt({
    secret: jwks.expressJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: 'https://dev-msb4t7yt.auth0.com/.well-known/jwks.json'
    }),
    audience: 'https://timesheets.baavaanee.ca',
    issuer: 'https://dev-msb4t7yt.auth0.com/',
    algorithms: ['RS256']
  });

  app.use(jwtCheck);

}else{
  dotenv.config()
}

const t = new Timesheet(new DB({host:process.env.HOST,database:process.env.DB,password:process.env.PASSWORD,username:process.env.USERNAME}));




// get all todos
app.get('/api/v1/items', (req, res) => {


  let user = req.header('user');

  if(user === undefined || user < 0){
    res.status(400).send({
      success: 'false',
      message: 'unable to process user',
    });  
    
    return;
  }

  t.getUserItems({user:user})
  .then(r=>{
    res.status(200).send({
      success: true,
      message: 'Get items associated to the user',
      entries: r
    });
  })
  .catch(e=>{
    res.status(400).send({
      success: false,
      message: 'Failed to get items associated to the user',
      error: e
    });    
  })

});


app.post('/api/v1/items', (req,res) => {

  let user = req.header('user');
  let merchantid = req.body['merchantid'];
  let description = req.body['description'];
  let date = req.body['date'];
  let timestart = req.body['timestart'];
  let duration = req.body['duration'];

  t.addUserItem({user:user,merchantid:merchantid,description:description,date:date,timestart:timestart,duration:duration})
  .then(r=>{
    res.status(200).send({
      success: true,
      message: 'Get items associated to the user',
      entries: r
    });
  })
  .catch(e=>{
    res.status(400).send({
      success: false,
      message: 'Failed to get items associated to the user',
      error: e
    });    
  })  

});



//--------



app.get('/api/v1/merchants', (req,res) => {

  let user = req.header('user');

  t.getUserMerchants({user:user})
  .then(r=>{
    res.status(200).send({
      success: true,
      message: 'Get merchants associated to the user',
      entries: r
    });
  })
  .catch(e=>{
    res.status(400).send({
      success: false,
      message: 'Failed to get merchants associated to the user',
      error: e
    });    
  })  

});

app.post('/api/v1/merchants', (req,res) => {

  let user = req.header('user');
  let name = req.body['name'];
  let rate = req.body['rate'];

  t.addUserMerchant({user:user,name:name,rate:rate})
  .then(r=>{
    res.status(200).send({
      success: true,
      message: 'Added merchant associated to the user',
      entries: r
    });
  })
  .catch(e=>{
    res.status(400).send({
      success: false,
      message: 'Failed to add merchant associated to the user',
      error: e
    });    
  })  

});



//--------



app.get('/api/v1/users', (req,res) => {

  let user = req.header('user');

  //TODO: check user has admin roles

  t.getUsers()
  .then(r=>{
    res.status(200).send({
      success: true,
      message: 'Get users',
      users: r
    });
  })
  .catch(e=>{
    res.status(400).send({
      success: false,
      message: 'Failed to get merchants associated to the user',
      error: e
    });    
  })  

});

app.post('/api/v1/users', (req,res) => {

  let user = req.header('user');
  let username = req.body['username'];
  let sourcesystemid = req.body['sourcesystemid'];
  let sourceidsystem = req.body['sourceidsystem'];

  console.log(req.body);

  t.addUser({username:username,sourcesystemid:sourcesystemid,sourceidsystem:sourceidsystem})
  .then(r=>{
    res.status(200).send({
      success: true,
      message: 'Added user',
      entries: r
    });
  })
  .catch(e=>{
    res.status(400).send({
      success: false,
      message: 'Failed to get user',
      error: e
    });    
  })  

});

const PORT = 5000;



app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
});
