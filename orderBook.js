/**
 * Single entity of local Order Book Model 
 */

class OrderBook {
    constructor(){
        // Private Value
        this._data = {
            eventTime: "",
            symbol: "",
            finalId: "",
            firstId: "",
            asks: [],
            bids: [],

        } 
    }
    getOrderBook(){
        return this._data;
    }
}

module.exports = OrderBook;