/**
 * Shourya Raj
 * shourayraj1999@gmail.com
 */
/**
 * The main function to run the application
 */
const DepthAPISocket = require('./depthClientSocket');
const prompt = require('prompt-sync')();

// const ws = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@depth@100ms');
// Getting input value using the library node js library
var quantitybtc = prompt("Write BTC quantity:  ");
// Error handler
try{
    quantitybtc = parseFloat(quantitybtc);
}catch(error){
    console.log(`${error}\t Inputted Quantity: ${quantitybtc}`);
}

// console.log(ans)

// Initial Value, easily changable
const initialAPIString = 'wss://stream.binance.com:9443/ws/';

var currency = 'btcusdt';
// var currency = 'btcaud';
const time  = '100ms';
// const time = '1000ms';


// Initiating the functionality Depth providing all given parameters
var ClientDepthSocket = new DepthAPISocket(initialAPIString, currency, time, "buy", quantitybtc);
// Initialising API independently
ClientDepthSocket.initilalise_API()
// Connecting to the server using websocket to communicate
ClientDepthSocket.connect();






