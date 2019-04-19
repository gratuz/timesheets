import Timesheet from '../timesheet';
import DB from '../db';
import {expect} from 'chai';

// begin a test suite of one or more tests
describe('testing timesheet functions', function() {

    const db = new DB({host:'localhost',database:'postgres'});
    const t = new Timesheet(db);

    // add a test hook
    beforeEach(function() {
      // ...some logic before each test is run
    })
    
    // test a functionality
    it('should add numbers', function() {
      // add an assertion
      expect(10+5).to.equal(15);
    })

    it('clears tables', (done) => {
        const resolvingPromise = new Promise( (resolve) => {
            db.clear()
            .then(()=>{
                resolve('promise resolved');
            })
        });
        resolvingPromise.then( (result) => {
          expect(result).to.equal('promise resolved');
          done();
        });
      });
    

      it('sets up tables', (done) => {
        const resolvingPromise = new Promise( (resolve) => {
            db.start()
            .then(()=>{
                resolve('promise resolved');
            })
        });
        resolvingPromise.then( (result) => {
          expect(result).to.equal('promise resolved');
          done();
        });
      });

      it('adds a user', (done) => {
        const resolvingPromise = new Promise( (resolve) => {
            t.addUser({username:'gratus',sourcesystemid:'123',sourceidsystem:'abc'})
            .then((r)=>{
                resolve(r);
            })
        });
        resolvingPromise.then( (result) => {
          expect(result[0].username).to.equal('gratus');
          expect(result[0].sourcesystemid).to.equal('123');
          expect(result[0].sourceidsystem).to.equal('abc');
          done();
        });
      });     
      
      it('it tears down the tables', (done) => {
        const resolvingPromise = new Promise( (resolve) => {
            db.clear()
            .then(()=>{
                resolve('promise resolved');
            })
        });
        resolvingPromise.then( (result) => {
          expect(result).to.equal('promise resolved');
          done();
        });
      });

    // ...some more tests
    
});

/*
const db = new DB({host:'localhost',database:'postgres'});
const t = new Timesheet(db);

db.clear()
.then(r=>{
    console.log('start');
    return db.start();
})
.then(r=>{
    console.log('add');
    return t.addUser({username:'gratus',sourcesystemid:'123',sourceidsystem:'abc'});
})
.then(r=>{
    console.log('get');
    console.log(r);
    return t.getUsers();
})
.then(r=>{
    console.log('clear');
    console.log(r);
    return db.clear();
})
.then(r=>{
    console.log(r);
    process.exit();
})
.catch(e=>{
    console.log(e);
    process.exit();
});

*/







