import express from 'express';


const error_bad_request = "Unable to retrieve.";



export default function UserRoutes(timesheet){

    const router = express.Router();
    router.get('', (req,res) => {

        let user = req.header('user');
        
        timesheet.getUsers()
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
            message: error_bad_request,
            error: e
            });    
        })  
        
    });
    
    router.post('', (req,res) => {

        let user = req.header('user');
        let username = req.body['username'];
        let sourcesystemid = req.body['sourcesystemid'];
        let sourceidsystem = req.body['sourceidsystem'];
    
    
        timesheet.addUser({username:username,sourcesystemid:sourcesystemid,sourceidsystem:sourceidsystem})
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
            message: error_bad_request,
            error: e
            });    
        });  
    });


    return router;
}





    







