const Output = require('./output');
/**
 * The Helper class to store and process the coming stream of data 
 * from the established communication channel for local record
 */
class DataProcess{
    constructor(dataController, quantity){
        // Summation of the trading quantity since it started recording
        this._previous_quantity = 0
        // Previous summation of values * quantity since it started recording
        this._previous_sum = 0
        // Data controller function main funtionality to manipute and update the local stream of data
        this._controller = dataController;
        // Count to track number of streams of buffered data
        this._count = 0;
        // Displaying handler for the console
        this._outputHandler = new Output();
        // Exchange --> "buy" or "sell"
        this._exchange = "";
        // user specified quantity
        this._userQuantity = quantity;
    }


    dataStream(exchange, tradeData){
        // Setting the exchange demand from the user
        this.setExchange(exchange);
        // if the data is first stream of data in the system just record it.
        if (this._count > 0){
            // Using Controller functionality to process the data on the previous stream of data to compare the next stream of data
            this._controller.setDataToPrevious();
            // Comparing the current stream of data with the previous stream of data, to make use the correctness of the data.
            if (tradeData.u > this._controller.getId().finalId){
                if (tradeData.U <= this._controller.getId().finalId + 1 && tradeData.u >= this._controller.getId().finalId + 1){ 
                    // Creating new record using the controller class      
                    var localOrderBook = this._controller.createNewOrderBook(tradeData);
                    // Asks order, the person who wants to buy 
                    if(this._exchange == "buy"){
                         // calculation of weight using the local record data
                         this.weightedAverage(this._controller.getAsks());
                    }
                    else if(this._exchange == "sell"){
                        this.weightedAverage(this._controller.getBids());
                    }
                    // Setting the previous data to current data for next next upcoming batch of data
                    this._controller.setPreviousData(localOrderBook);
                
                }
            }   
        }
        else{
             // Creating new record using the controller class      
            var localOrderBook = this._controller.createNewOrderBook(tradeData);
            // Setting the previous data to current data for next next upcoming batch of data
            this._controller.setPreviousData(localOrderBook);
        }
        this._count =  this._count + 1;
    
    }

    weightedAverage(value){
        // sum is quantity * price
        var sum = 0;
        // Total quantity
        var share = 0;
        // Weighted Average
        var average = 0;
        var gone = false;
        // Looping all values in the stram of data
        for(var i = 0; i< value.length; i++){
            gone = false
            sum += (parseInt(value[i][0]) * parseInt(value[i][1]));
            // summation = cost * share
            // average weighted value = summation/total share 
            share += parseInt(value[i][1]);
        }
        // Making sure that stream of data doesn't have any 0 quantity 
        if(!gone && share != 0){
            gone = true
            // Weighted average
            average = (this._previous_sum + sum)/(this._previous_quantity + share)

            // Displaying result just after the calculation to perform faster performance
            this.displayResult(average);
            // Cummlating the values to add in the next batch
            this._previous_sum += sum 
            this._previous_quantity += share
            sum = 0;
            share = 0;
        }
    }

    displayResult(value){
        //Displaying the weighted average for 1 BTC using the output class and also calculting the user demand value for specific 
        var calculated = value * this._userQuantity;
        this._outputHandler.sameLineOutput(`${value}       BitCoin Price to ${this._exchange}: ${calculated}  for quantity ${this._userQuantity}`);
    }
    setExchange(exchange){
        this._exchange = exchange;
    }
    
}


module.exports = DataProcess;