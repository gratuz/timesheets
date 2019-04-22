import express from 'express';


const error_bad_request = "Unable to retrieve.";



export default function ProjectRoutes(timesheet){

    const router = express.Router();
    router.get('', (req,res) => {

        let user = req.header('user');

        timesheet.getUserMerchants({user:user})
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
    
    router.post('', (req,res) => {

        let user = req.header('user');
        let name = req.body['name'];
        let rate = req.body['rate'];
      
        timesheet.addUserMerchant({user:user,name:name,rate:rate})
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


    return router;
}





    







