const WebSocket = require('ws');
const Process = require('./dataprocess');
const OrderBookController = require('./orderBookController');
const OrderDataRecorder = require('./orderdataRecorder');
const assert = require('assert');
// const ClientSocket = require('./clientSocket');
/**
 * Functionality of the class to process intial functionality, setup data recoder and provide communication  channel
 * 
 */
class DepthAPISocket{
    constructor(API, currency, time, exchange, quantity){
        // super()
        this.setAPI(API);
        this.setCurrency(currency);
        this.setTimeInterval(time);
        this._label = "depth";
        // Here exchange could be two value either "buy" or "sell"
        this.setExchange(exchange);
        this.setQuantity(quantity);

        // Helper functions to work on this messgae connetion using websocket
        this._dataRecorder = new OrderDataRecorder()
        this._controller = new OrderBookController(this._dataRecorder);
        this._process = new Process(this._controller, this.getQuantity());
    }
    initilalise_API(){
        /**
         * Combining all parameter to produce fucntional API
         */
        this._API = `${this.getAPI()}${this.getCurrency()}@${this._label}@${this.getTimeInterval()}`
    }
    connect(){
        /**
         * Communication function using websocket, printing average weighted value for 1 BTC and also for given quantity BTC 
         */
        // need to check first initilalise API otherwise through error to provide the string
        const ws = new WebSocket(this._API);

        ws.on('error', (error) => {
           console.log(`Error ${error}`)
        })
        // Establishing the connection
        ws.on('message', (data) => {
            // Checkin if data is available
            if (data) {
                 const tradeData = JSON.parse(data); // parsing single-trade record
                // console.log(this._currency)
                // Processing the data to store in the record and calculate the average weighted price
                 this._process.dataStream(this._exchange, tradeData, this.getQuantity());

            }
        });

    }
    setAPI(API){
        this._API = API;
    }
    getAPI(){
        return this._API;
    }
    setCurrency(currency){
        this._currency = currency;
    }
    setTimeInterval(time){
        this._timeInterval = time;
    }
    getCurrency(){
        return this._currency;
    }
    getTimeInterval(){
        return this._timeInterval;
    }
    setExchange(value){
        this._exchange = value;
    }
    setQuantity(quantity){
        assert(quantity != NaN, "Value is undefined")
        this._quantity = quantity;
    }
    getQuantity(){
        if(this._quantity != undefined){
            return this._quantity;
        }
        else{
            console.log("Quantity is undefined");
        }
    }
}


module.exports = DepthAPISocket;