export default class Timesheet {

    constructor(db){
        this.db = db;
    }

    /**
     * 
     * Timesheet APIs 
     */

    getUserItems({user,start='2000-01-01',end='3000-01-01'}){
        
        const query = 'SELECT * FROM items WHERE userid = $1 and date >= $2 and date <= $3';
        const values = [user,start,end];

        return this.db.execute({query:query,values:values});
    }

    addUserItem({user,merchantid,description="A timesheet item",date,timestart,duration=0.25}){

        if(timestart > 23 || timestart < 0) {
            return _promiseError(new Error("Unrecognized start time: "+timestart));
        }

        if(duration > 23 || duration < 0) {
            return _promiseError(new Error("Unsupported duration: "+duration));
        }

        const query = 'INSERT INTO items(userid,merchantid,description,date,timestart,duration) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
        const values = [user,merchantid,description,date,timestart,duration];

        return this.db.execute({query:query,values:values});
    } 
/*
    getUserMonthlySummary({userId,month,year}){

        if(month > 23 || month < 0) {
            return new Error("Unrecognized month: "+timestart);
        }

        if(year > 2000 || duration < 3000) {
            reject(new Error("Unsupported year: "+duration));
        }
        const query = 'SELECT * FROM items WHERE userid = $1, EXTRACT(MONTH FROM date) = $2, EXTRACT(YEAR FROM date) = $3 GROUP BY merchantid';
        const values = [userId,month,year];
        
        return this.db.execute({query:query,values:values});
    }   
    
    getAnnualSummary({userId,year}){

        if(year < 2000) {
            return new Error("Unsupported year: "+year);
        }
        const query = 'SELECT * FROM items WHERE userid = $1, EXTRACT(YEAR FROM date) = $2 GROUP BY merchantid';
        const values = [userId,year];

        return this.db.execute({query:query,values:values});

    }    
*/
    /*
     * Merchant APIs
     */

    getUserMerchants({user=null}){

        if(user === null ) {
            return _promiseError(new Error("User Id is a required parameter"));
            
        }

        const query = 'SELECT * FROM merchants WHERE userid = $1';
        const values = [user];

        return this.db.execute({query:query,values:values});
    }



    addUserMerchant({user,name,rate}){

        if(rate > 10000 || rate < 0) {
            return _promiseError(new Error("Unsupported year: "+duration));
        }
        const query = 'INSERT INTO merchants(userid,name,rate) VALUES  ($1,$2,$3) RETURNING *';
        const values = [user,name,rate];

        return this.db.execute({query:query,values:values});       
    }  
    
    
    /*
     * User APIs
     */

    getUsers(){

        const query = 'SELECT * FROM users';    
        
        return this.db.execute({query:query}); 
    }



    addUser({username="",sourcesystemid="",sourceidsystem=""}){

        if(username === "" || sourcesystemid === "" || sourceidsystem === "") {
            return _promiseError(new Error("Required information is missing"));
        }
        const query = 'INSERT INTO users(username,sourcesystemid,sourceidsystem) VALUES  ($1,$2,$3) RETURNING *';
        const values = [username,sourcesystemid,sourceidsystem];      
        
        return this.db.execute({query:query,values:values}); 
    }


    _promiseError(error){
        let p = new Promise((resolve,reject)=>{
            reject(error);
        });

        return p;
    }

}

