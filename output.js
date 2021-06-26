class Output{
    /**
     * Helper Functionality for Displaying the result
     */
    constructor(){
    }

    sameLineOutput(value){
        // Printing in the same line
        process.stdout.write(`${value} \r`);
    }
}

module.exports = Output;