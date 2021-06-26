/**
 * Local Order Book Controller to access the data and record the data
 */
 const OrderBook = require('./orderBook');

 class OrderBookController {
    constructor(dataRecorder){
        // Private Value
        // Similar data values from order book 
        this._data = {} 
        this._previous= new OrderBook();
        this._dataRecorder = dataRecorder;
       
    }

    setData(myData){
        // Setting any sepific order book data to access it using controller
        this._data = myData.getOrderBook();
    }
    createNewOrderBook(myData){
        // Creating the new order book data and storing into the record
        this._localOrderBook = new OrderBook();
        // Setting the currect data order to currently made new data
        this.setData(this._localOrderBook);
        // setting all values that is coming from the stream
        this.setEventTime(myData.E);
        this.setSymbol(myData.s);
        this.setId(myData.u, myData.U);
        this.setBids(myData.b);
        this.setAsks(myData.a);
        // Potential region for side effect, need to think alternative here.
        this._dataRecorder.addRecord(myData.E, this._localOrderBook)
        return this._localOrderBook;
    }

    setEventTime(eventTime) {
        this._data.eventTime = eventTime;

    }
    getEventTime(){
        return  this._data.eventTime;
    }
    setSymbol(symbol){
        this._data.symbol = symbol;
    }
    getSymbol(){
        return this._data.symbol
    }

    setId(finalId, firstId){
        this._data.finalId = finalId;
        this._data.firstId = firstId;
    }

    getId(){
        // Ids are two types final id is the lastupdateid and firstId is the first starting id
        // return value [finalId, firstId]
        return {finalId: this._data.finalId, firstId: this._data.firstId};
    }

    setAsks(asks){
       
        this._data.asks = asks;
    }

    getAsks(){
        return this._data.asks;
    }

    setBids(bids){
        this._data.bids = bids;
    }

    getBids(){
        return this._data.bids;
    }
    setDataToPrevious(){
        // Setting the controller access to the previous recorded data
        this._data = this._previous.getOrderBook()
    }

    setPreviousData(previous){
        // setting the new previous data in the controller
        this._previous = previous;
    }
}

module.exports = OrderBookController;