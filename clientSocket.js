const WebSocket = require('ws');

class ClientSocket{
    constructor() {
        if (this.method === undefined) {
          // or maybe test typeof this.method === "function"
          throw new TypeError("Must override method");
        }
    }
    initilalise_API(){
        throw new Error("Method 'initilalise_API' must be implemented.");
    }
    connect(){
        throw new Error("Method 'connect()' must be implemented.");
    }

    error(){
        throw new Error("Method 'error()' must be implemented.");
    }

    close(){
        throw new Error("Method 'close()' must be implemented.");
    }

    
}