import express from 'express';


const error_bad_request = "Unable to retrieve.";



export default function RecordRoutes(timesheet){

    const router = express.Router();
    router.get('', (req,res) => {

        let user = req.header('user');

        if(user === undefined || user < 0){
          res.status(400).send({
            success: 'false',
            message: 'unable to process user',
          });  
          
          return;
        }
      
        timesheet.getUserItems({user:user})
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
    
    router.post('', (req,res) => {

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


    return router;
}





    







