const { Pool } = require('pg')
import fs from 'fs';


export default class DB{

    constructor({host="",database="",username="",password="",port=5432}){

        this.pool = new Pool({
            host: host,
            port: port,
            database: database,
            user: username,
            password: password,
            max: 20,
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 2000,
          })
    }

    execute({query,values=[]}){
        
        let p = new Promise((resolve,reject) => {

            let result = {};
            this.pool.connect((err, client, release) => {
                if(err) {
                    console.error('error fetching client from pool', err);
                    reject(err);
                }
                client.query(query, values, function(err, result) {
                  //call `done()` to release the client back to the pool
                  release();
              
                  if(err) {
                    console.error('error running query', err);
                    reject(err);
                  }
                    if(result) resolve(result.rows)
                    else resolve("complete");
                });
              });
        })

        return p;
    }


    start(){
        var sql = fs.readFileSync('db/tables.sql').toString();
        return this.execute({query:sql});
    }

    clear(){
        var sql = fs.readFileSync('db/_tables.sql').toString();
        return this.execute({query:sql});        
    }
  
    






}

