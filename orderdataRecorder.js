/**
 * OrderDataRecorder is using HashMap to keeping record in the local system
 * This will help to achieve O(1) access time from the system
 * The Key pair to store the data is eventtime as a key and order book as data
 * And later controller can have access to use it. 
 */
class OrderDataRecorder{
    constructor(){
        this._OrderDataRecorder = new Map()
    }

    addRecord(eventTime, orderData){
        // Checking if eventtime exist in the system before adding the value
        if(!this._OrderDataRecorder.has(eventTime)){
            this._OrderDataRecorder.set(eventTime, orderData);
        }
        else{
            console.log(`EventTime ${eventTime} data already exists. Better to update the data`)
        }
    }
    
    deleteRecord(eventTime){
        // Checking before if event time exist in the system 
        if(this._OrderDataRecorder.has(eventTime)){
            this._OrderDataRecorder.delete(eventTime);
        }
        else{
            console.log("The event doesn't exist in the system");
        }
    
    }
    getRecord(eventTime){
         // Checking before if event time exist in the system 
        if(this._OrderDataRecorder.has(eventTime)){
            return this._OrderDataRecorder.get(eventTime);
        }
        else{
            console.log(`EventTime ${eventTime} is not stored in the record`)
        }
       

    }


}

module.exports = OrderDataRecorder;
